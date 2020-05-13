import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Button, Loader, Label, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dayjs from 'dayjs';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { StudySessions } from '../../api/studysessions/StudySessions';
import profileStyle from '../components/sessions/profilestyle';
import SessionCard from '../components/sessions/SessionCard';
import EditProfile from '../components/profile/EditProfile';
import {
  ProfileContainer,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TopInfo,
  Owner,
  Major,
  Avatar,
  Stats,
  MiddleInfo,
  CourseHeader,
  CourseList,
} from '../components/profile/profile';

const MySwal = withReactContent(Swal);

const columns = [
  {
    name: 'DATE',
    selector: 'start',
    compact: true,
    style: {
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.5)',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
    width: '100px',
    format: row => dayjs(row.start).format('MM/DD h:mm A'),
  },
  {
    name: 'TOPIC',
    selector: 'topic',
    maxWidth: '350px',
  },
];

class Profile extends React.Component {

  editProfilePop(id) {
    MySwal.fire({
      showConfirmButton: false,
      background: 'transparent',
      width: 450,
      padding: '0',
      html: <EditProfile doc={id} />,
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const profile = this.props.userprofile;
    const { name, avatar, bio, points, major, year } = this.props.userprofile;

    return (
      <ProfileContainer>
        <Card>
          <CardHeader>
              <Owner>
                {name.first} {name.last}
              </Owner>
              <Major>
                {major}
              </Major>
          </CardHeader>
          <CardBody>
            <TopInfo>
              <Avatar avatar={avatar}/>
              <Stats>
                <span style={{ color: 'rgba(101, 196, 88, 0.64)' }}>
                  Verified Student
                </span>
              </Stats>
              <Stats>
                <span>{year}</span>
                <span style={{ fontSize: '14px', color: 'rgba(0,0,0,.6' }}>
                  {points} points
                </span>
              </Stats>
            </TopInfo>
            <MiddleInfo>
              {bio}
            </MiddleInfo>
            <CourseHeader>Sensei:</CourseHeader>
            <CourseList>
              {profile.courses.sensei.sort(function (a, b) { return a - b; }).map(
                (course) => <Label key={course} color='grey' size='tiny'>
                  {course}
                </Label>,
              )}
            </CourseList>
            <CourseHeader>Grasshopper:</CourseHeader>
            <CourseList>
              {profile.courses.grasshopper.sort(function (a, b) { return a - b; }).map(
                (course) => <Label key={course} color='grey' size='tiny'>
                  {course}
                </Label>,
              )}
            </CourseList>
          </CardBody>
          <CardFooter>
            <Button
              onClick={() => this.editProfilePop(profile)}
              compact
              color='black'
              floated='right'
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
        <div>
          <Header inverted as='h4'>{`${profile.name.first}'s Upcoming Sessions`}</Header>
          <DataTable
            noHeader
            noTableHead
            columns={columns}
            data={this.props.studysessions}
            keyField={this.props.studysessions._id}
            dense
            pagination
            defaultSortField='date'
            paginationIconNext={<Icon fitted name='angle right'/>}
            paginationIconPrevious={<Icon fitted name='angle left'/>}
            paginationIconFirstPage={''}
            paginationIconLastPage={''}
            paginationComponentOptions={{ noRowsPerPage: true }}
            paginationPerPage={5}
            theme='profile'
            customStyles={profileStyle}
            pointerOnHover
            highlightOnHover
            onRowClicked={row => MySwal.fire({
              showConfirmButton: false,
              background: 'transparent',
              width: 275,
              padding: '0',
              html: <SessionCard studysession={row} />,
            })}
          />
        </div>
      </ProfileContainer>
    );
  }
}

/** Require an array of StudySessions in the props. */
Profile.propTypes = {
  userprofile: PropTypes.object,
  studysessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Sessions.
  const subscription1 = Meteor.subscribe('UserProfiles');
  const subscription2 = Meteor.subscribe('StudySessions');
  return {
    studysessions: StudySessions.find({}).fetch(),
    userprofile: UserProfiles.findOne({}),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(Profile);

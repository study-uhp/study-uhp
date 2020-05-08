import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Button, Loader, Image, Label, Segment, Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { StudySessions } from '../../api/studysessions/StudySessions';
import DataTable from 'react-data-table-component';
import profileStyle from '../components/sessions/profilestyle';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SessionCard from '../components/sessions/SessionCard';

const MySwal = withReactContent(Swal);

const columns = [
  {
    name: 'DATE',
    selector: 'date',
    compact: true,
    style: { 
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.5)',
      paddingLeft: '5px',
      paddingRight: '5px'
    },
    width: '65px',
  },
  {
    name: 'TOPIC',
    selector: 'topic',
    compact: true,
    maxWidth: '169px',
  },
];

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const profile = this.props.userprofile
    const { name, avatar, bio, points } = this.props.userprofile;

    return (
      <Grid container centered className="main-content">
        <Grid.Column style={{ width: '80%' }}>
          <Header as="h2" textAlign="center">Profile</Header>
          <Segment.Group horizontal >
            <Segment inverted style={{ width: '30%' }}>
              <Image src={avatar} size='small' circular centered/>
              <Header as="h2" textAlign="center">{name.first} {name.last}</Header>
              <Header as='h5' textAlign="center">Points: {points}</Header>
              {bio}
              <br/><br/>
              {/* <Button 
                onClick={this.handleClick}
                compact className="button-style" floated="right"
                >Console
              </Button> */}
              <Button 
                as={Link} to={`/editprofile/${profile._id}`} 
                compact className="button-style" floated="left"
                >Edit
              </Button>
            </Segment>
            <Segment inverted style={{ width: '40%' }}>
              <Header inverted as='h4'>{profile.name.first}'s Courses</Header>
              <Header inverted as='h5'>Sensei:</Header>
              {profile.courses.sensei.map((course) => 
                <Label key={course} color='grey' size='tiny'>
                  {course}
                </Label>
              )}
              <Header inverted as='h5'>Grasshopper:</Header>
              {profile.courses.grasshopper.map((course) => 
                <Label key={course} color='grey' size='tiny'>
                  {course}
                </Label>
              )}
            </Segment>
            <Segment inverted style={{ width: '30%' }}>
              <Header inverted as='h4'>{profile.name.first}'s Upcoming Sessions</Header>
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
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require an array of StudySessions in the props. */
Profile.propTypes = {
  // userprofile: PropTypes.array.isRequired,
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
    // userprofile: UserProfiles.find({}).fetch(),
    userprofile: UserProfiles.findOne({}),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(Profile);

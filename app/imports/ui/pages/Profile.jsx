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

const CustomTitle = ({ row }) => (
  <div>
    {}
    <div style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '.25rem', fontSize: '10px' }}>
      {row.date}
    </div>
    <div>
      <div style={{ marginBottom: '.25rem', overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
        {}
        {row.topic}
      </div>
    </div>
  </div>
);

const columns = [
  {
    name: 'COURSE',
    selector: 'course',
    width: '70px',
    style: { fontSize: '11px' }
  },
  {
    name: 'TOPIC',
    selector: 'topic',
    compact: true,
    maxWidth: '169px',
    cell: row => <CustomTitle row={row} />,
  },
  {
    name: 'DATE',
    selector: 'date',
    compact: true,
    omit: true,
  },
];

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {

  handleClick = () => {
    console.log(this.props.userprofile)
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const profile = this.props.userprofile
    const userName = `${profile.name.first} ${profile.name.last}`;
    const userAvatar = profile.avatar;
    const userBio = profile.bio;
    const userPoints = profile.points;

    return (
      <Grid container centered className="main-content">
        <Grid.Column style={{ width: '80%' }}>
          <Header as="h2" textAlign="center">Profile</Header>
          <Segment.Group horizontal >
            <Segment inverted style={{ width: '30%' }}>
              <Image src={userAvatar} size='small' circular centered/>
              <Header as="h2" textAlign="center">{userName}</Header>
              <Header as='h5' textAlign="center">Points: {userPoints}</Header>
              {userBio}
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
              sortIcon={<Icon name='angle down'/>}
              paginationIconNext={<Icon fitted name='angle right'/>}
              paginationIconPrevious={<Icon fitted name='angle left'/>}
              paginationIconFirstPage={<Icon fitted name='angle double left'/>}
              paginationIconLastPage={<Icon fitted name='angle double right'/>}
              paginationComponentOptions={{ noRowsPerPage: true }}
              paginationPerPage={5}
              theme='profile'
              customStyles={profileStyle}
              pointerOnHover
              highlightOnHover
              onRowClicked={row => 
                this.state.session === row 
                ? this.setState({ session: {} })
                : this.setState({ session: row })
              }
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

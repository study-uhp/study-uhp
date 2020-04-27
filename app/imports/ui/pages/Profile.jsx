import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Feed, Button, Loader, Image, Label, Segment, Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { StudySessions } from '../../api/studysessions/StudySessions';
import SmallCalendar from '../components/SmallCalendar';

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {

  handleClick = () => {
    console.log(this.props.userprofile[0])
    console.log(Meteor.user());
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const userName = `${this.props.userprofile[0].name.first} ${this.props.userprofile[0].name.last}`;
    const userAvatar = this.props.userprofile[0].avatar;
    const userBio = this.props.userprofile[0].bio;

    return (
      <Grid container centered className="main-content">
        <Grid.Column>
          <Header as="h2" textAlign="center">Profile</Header>
            <Segment.Group horizontal>
              <Segment inverted>
                <Image src={userAvatar} size='small' circular centered/>
                <Header as="h2" textAlign="center">{userName}</Header>
                <Button compact className="button-style" floated="right" onClick={this.handleClick}>Console</Button>
                <Button 
                  as={Link} to={`/editprofile/${this.props.userprofile[0]._id}`} 
                  compact className="button-style" floated="left"
                >
                  Edit
                </Button>
              </Segment>
              <Segment inverted style={{ width: '50%' }}>
                {userBio}
              </Segment>
              <Segment inverted style={{ width: '25%' }}>
                {/* <SmallCalendar/> */}
                <Feed size='small'>
                  <Header as='h4'>{this.props.userprofile[0].name.first}'s Upcoming Sessions</Header>
                    {this.props.studysessions.map((studysession) => 
                  <Feed.Event>
                    <Feed.Label>
                      <Label color='black' size='tiny'>
                        {studysession.course}
                      </Label>
                    </Feed.Label>
                    <Feed.Content>
                    <Feed.Date>
                      {studysession.date}
                    </Feed.Date>
                      <Feed.Summary>
                        {studysession.topic}
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  )}
                  </Feed>
              </Segment>
            </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require an array of StudySessions in the props. */
Profile.propTypes = {
  userprofile: PropTypes.array.isRequired,
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
    userprofile: UserProfiles.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(Profile);

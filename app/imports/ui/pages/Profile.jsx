import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {
<<<<<<< Updated upstream
  render() {
    return (
        <Card container centered className="card-style">
            <Card.Content header={'User 1'} textAlign="center"/>
            <Card.Content
                style={{
                    height: '200px',
                    backgroundImage: 'url(images/user.png)',
                    backgroundSize: 'cover',
                }}
            ></Card.Content>
            <Card.Content>
                <Button compact secondary as={NavLink} activeClassName="button-style"
                        exact to="/Friends" key='Friends'>Friends</Button>
                <Button compact secondary as={NavLink} activeClassName="button-style" floated="right"
                        exact to="/AddFriend" key='AddFriend'>Add Friend</Button>
            </Card.Content>
        </Card>

=======

  handleClick = () => {
    console.log(this.props.userprofile);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const profile = this.props.userprofile;
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
              <Button
                  as={Link} to={`/friends/${profile._id}`}
                  compact className="button-style" floated="center"
              >Friends
              </Button>
              <Button
                  as={Link} to={`/addfriend/${profile._id}`}
                  compact className="button-style" floated="bottom-left"
              >Add Friends
              </Button>
            </Segment>
            <Segment inverted style={{ width: '40%' }}>
              <Header inverted as='h4'>{profile.name.first}'s Courses</Header>
              <Header inverted as='h5'>Sensei:</Header>
              {profile.courses.sensei.map((course) => <Label key={course} color='grey' size='tiny'>
                  {course}
                </Label>)}
              <Header inverted as='h5'>Grasshopper:</Header>
              {profile.courses.grasshopper.map((course) => <Label key={course} color='grey' size='tiny'>
                  {course}
                </Label>)}
            </Segment>
            <Segment inverted style={{ width: '30%' }}>
              <Header inverted as='h4'>{profile.name.first}'s Upcoming Sessions</Header>
                {this.props.studysessions.map((studysession) => <Feed key={studysession._id} size='small'>
                    <Feed.Event>
                    <Feed.Label>
                      <Label size='mini' color='black'>
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
                  </Feed>)}
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
>>>>>>> Stashed changes
    );
  }
}

export default Profile;

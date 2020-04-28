import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {
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

    );
  }
}

export default Profile;

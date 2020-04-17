import React from 'react';
import { Card, Button } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {
  render() {
    return (
        <Card container centered className="card-style">
            <Card.Content header={"User 1"} textAlign="center"/>
            <Card.Content
                style={{
                    height: "200px",
                    backgroundImage: `url(images/user.png)`,
                    backgroundSize: "cover",
                }}
            ></Card.Content>
            <Card.Content>
                <Button container className="button-style" floated="left">Friends</Button>
                <Button container className="button-style" floated="right">Settings</Button>
            </Card.Content>
        </Card>

    );
  }
}

export default Profile;

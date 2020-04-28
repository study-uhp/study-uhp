import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header } from 'semantic-ui-react';
import Friend from '/imports/ui/components/Friend';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FriendsC } from '../../api/friends/FriendsC';


/** A simple static component to render some text for the landing page. */
class Friends extends React.Component {

  render() {
    return (
        <Container>
            <Header as="h2" textAlign="center">Friends</Header>
            <Card.Group>
                {this.props.friendsc.map((friend, index) => <Friend key={index} friend={friend}/>)}
            </Card.Group>
        </Container>

    );
  }
}

/** Require an array of FriendsC in the props. */
Friends.propTypes = {
    friendsc: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Sessions.
    const subscription = Meteor.subscribe('FriendsC');
    return {
        friendsc: FriendsC.find({}).fetch(),
        ready: subscription.ready(),
    };
})(Friends);

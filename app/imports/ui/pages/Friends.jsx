import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import Friend from '/imports/ui/components/Friend';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { FriendsC } from '../../api/friends/FriendsC';


/** A simple static component to render some text for the landing page. */
class Friends extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

<<<<<<< Updated upstream
  renderPage() {
    return (
        <Container>
            <Header as="h2" textAlign="center">Friends</Header>
            <Card.Group>
                {this.props.friendsc.map((friend) => <Friend
                    key={friend._id} studysession={friend} />)}
            </Card.Group>
        </Container>

    );
  }
}

=======
    renderPage() {
        return (
            <Container>
                <Header as="h2" textAlign="center">Friends</Header>
                <Card.Group>
                    {this.props.friendsc.map((friend) => <Friend
                        key={friend._id} studysession={friend} />)}
                </Card.Group>
            </Container>
        );
    }
}
>>>>>>> Stashed changes
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

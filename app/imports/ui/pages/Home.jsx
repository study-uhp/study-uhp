import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { StudySessions } from '../../api/studysessions/StudySessions';
import ListStudySessions from './ListStudySessions';

/** Renders a table containing all of the StudySessions. Use <StudySession> to render each row. */
class Home extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        return (
            <Grid container centered className="main-content">
                <Grid.Column>
                    <Header as="h2" textAlign="center">Home</Header>
                    <ListStudySessions/>
                </Grid.Column>
            </Grid>
        );
    }
}

/** Require an array of StudySessions in the props. */
Home.propTypes = {
    studysessions: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Sessions.
    const subscription = Meteor.subscribe('StudySessions');
    return {
        studysessions: StudySessions.find({}).fetch(),
        ready: subscription.ready(),
    };
})(Home);

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StudySessions } from '../../api/studysessions/StudySessions';
import StudySession from '../components/StudySession';

/** Renders a table containing all of the StudySessions. Use <StudySession> to render each row. */
class ListStudySessions extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Sessions</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Course</Table.HeaderCell>
                <Table.HeaderCell>Topic</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.studysessions.map((studysession) => <StudySession
                key={studysession._id} studysession={studysession} />)}
            </Table.Body>
          </Table>
          <Button as={NavLink} activeClassName="active" exact to="/add" key='add'>Create Session</Button>
        </Container>
    );
  }
}

/** Require an array of StudySessions in the props. */
ListStudySessions.propTypes = {
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
})(ListStudySessions);
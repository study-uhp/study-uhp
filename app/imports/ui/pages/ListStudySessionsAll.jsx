import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Table, Header, Loader, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StudySessions } from '../../api/studysessions/StudySessions';
import StudySessionAll from '../components/StudySessionAll';

/** Renders a table containing all of the StudySessions. Use <StudySession> to render each row. */
class ListStudySessionsAll extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <Header as="h2" textAlign="center">List Sessions (All)</Header>
            <Table celled inverted compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Course</Table.HeaderCell>
                  <Table.HeaderCell>Topic</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Time</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.studysessions.map((studysession) => <StudySessionAll
                  key={studysession._id} studysession={studysession} />)}
              </Table.Body>
            </Table>
            <Button compact secondary as={NavLink} activeClassName="active" exact to="/add" key='add'>Create Session</Button>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of StudySessions in the props. */
ListStudySessionsAll.propTypes = {
  studysessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Sessions.
  const subscription = Meteor.subscribe('StudySessionsAll');
  return {
    studysessions: StudySessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStudySessionsAll);

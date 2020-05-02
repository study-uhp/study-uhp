import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Loader, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StudySessions } from '../../api/studysessions/StudySessions';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'COURSE',
    selector: 'course',
    sortable: true,
    width: '100px',
  },
  {
    name: 'TOPIC',
    selector: 'topic',
    sortable: true,
    cell: row => (
      <div>
        <Link to={`/viewstudysession/${row._id}`}>
          {row.topic}
        </Link>
      </div>
    ),
  },
  {
    name: 'DATE',
    selector: 'date',
    sortable: true,
    width: '125px',
  },
  {
    name: 'START',
    selector: 'timeBegin',
    sortable: true,
    width: '125px',
  },
  {
    name: 'END',
    selector: 'timeEnd',
    sortable: true,
    width: '125px',
  },
];

/** Renders a table containing all of the StudySessions. Use <StudySession> to render each row. */
class Sessions extends React.Component {

  /** Click handler for conole logging */
  handleClick = () => {
    console.log();
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <Header as="h2" textAlign="center">Upcoming Sessions</Header>
            <DataTable
              noHeader
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
              theme='dark'
            />
            <br/>
            <Button
              compact
              secondary
              as={NavLink}
              activeClassName="active"
              exact to="/add"
              key='add'
              content='Create Session'
            />
            <Button 
              compact
              onClick={this.handleClick}
              className="button-style"
              floated="right"
              content='Console'
            />
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of StudySessions in the props. */
Sessions.propTypes = {
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
})(Sessions);

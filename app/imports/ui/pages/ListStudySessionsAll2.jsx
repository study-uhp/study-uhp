import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Loader, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { StudySessions } from '../../api/studysessions/StudySessions';

// eslint-disable-next-line react/prop-types
const NewLayout = ({ Table, Pagination, Filter }) => (
  <div>
    <div style={ { float: 'left' } } className="ui input">
      <Filter />
    </div>
    <div style={ { float: 'right' } }>
      <Pagination />
    </div>
    <Table />
  </div>
);

const styleConfig = {
  icons: {
    TableHeadingCell: {
      sortDescendingIcon: <Icon name='angle down' />,
      sortAscendingIcon: <Icon name='angle up' />,
    },
  },
  classNames: {
    Table: 'ui celled inverted compact table',
    Filter: 'ui mini form input',
    NextButton: 'ui compact secondary button',
    PreviousButton: 'ui compact secondary button',
    PageDropdown: 'ui compact selection dropdown',
  },
  styles: {
  },
};

const sortProperties = [
  { id: 'date', sortAscending: true },
];

/** Renders a table containing all of the StudySessions. Use <StudySession> to render each row. */
class ListStudySessionsAll2 extends React.Component {

  CustomColumn = ({ value }) => <Link to={`/viewstudysession/${value}`}>View</Link>;

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
              <Griddle
                data={ this.props.studysessions }
                plugins={ [plugins.LocalPlugin] }
                sortProperties={sortProperties}
                styleConfig={styleConfig}
                components={{
                  Layout: NewLayout,
                }}
              >
              <RowDefinition>
                <ColumnDefinition id="course" title="Course" width={100} />
                <ColumnDefinition id="topic" title="Topic" />
                <ColumnDefinition id="date" title="Date" width={90} />
                <ColumnDefinition id="timeBegin" title="Start" width={110} />
                <ColumnDefinition id="timeEnd" title="End" width={120} />
                <ColumnDefinition id="_id" title="View" customComponent={this.CustomColumn} width={50}/>
              </RowDefinition>
            </Griddle>
            <br/>
            <Button compact secondary as={NavLink} activeClassName="active" exact to="/add" key='add'>
              Create Session
            </Button>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of StudySessions in the props. */
ListStudySessionsAll2.propTypes = {
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
})(ListStudySessionsAll2);

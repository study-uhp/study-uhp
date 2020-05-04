import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Loader, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StudySessions } from '../../api/studysessions/StudySessions';
import DataTable from 'react-data-table-component';
import columns from '../components/sessions/columns';
import SessionCard from '../components/sessions/SessionCard';
import { createTheme } from '../components/sessions/theme';
import sessionsStyle from '../components/sessions/style';

/** Renders a table containing all of the StudySessions. */
class Sessions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      session: {},
    }
  }
  
  /** Click handler for console logging */
  handleClick = () => {
    console.log(this.state);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Grid container centered className='main-content'>
          <Grid.Column width={12}>
            <Header as='h2' textAlign='center'>Upcoming Sessions</Header>
            <div style={{ 
              boxShadow: '-1px 5px 10px -6px black',
              borderBottomLeftRadius: '5px',
              borderBottomRightRadius: '5px',
            }}>
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
              theme='sessions'
              customStyles={sessionsStyle}
              pointerOnHover
              highlightOnHover
              onRowClicked={row => this.state.session === row ? this.setState({ session: {} }) : this.setState({ session: row }) }
            />
            </div>
            <br/>
            <Button
              compact
              secondary
              as={Link}
              to='/add'
              key='add'
              content='Create Session'
            />
            <Button 
              compact
              onClick={this.handleClick}
              className='button-style'
              floated='right'
              content='Console'
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <div style={{ paddingTop: '20px' }}>
              <Header as='h3' textAlign='center'>Session Details</Header>
              <SessionCard studysession={this.state.session} />
            </div>
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

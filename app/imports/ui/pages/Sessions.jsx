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

/** Renders a table containing all of the StudySessions. Use <StudySession> to render each row. */
class Sessions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: true,
      seshid: {},
    };
    this.toggleSession = this.toggleSession.bind(this);
  }
  
  toggleSession = val => {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
      seshid: val,
    });
  }
  
  /** Click handler for conole logging */
  handleClick = () => {
    console.log(this.state);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { opened } = this.state;
    

    return (
        <Grid container centered className='main-content'>
          <Grid.Column width={12}>
            <Header as='h2' textAlign='center'>Upcoming Sessions</Header>
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
              pointerOnHover
              highlightOnHover
              onRowClicked={row => this.state.seshid === row ? this.setState({ opened: false, seshid: {} }) : this.setState({ opened: true, seshid: row }) }
            />
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
            <Button 
              compact
              onClick={this.toggleSession}
              className='button-style'
              floated='right'
              content='Show'
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <div style={{ paddingTop: '20px' }}>
              <Header as='h3' textAlign='center'>Session Details</Header>
              {opened && <SessionCard studysession={this.state.seshid} />}
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

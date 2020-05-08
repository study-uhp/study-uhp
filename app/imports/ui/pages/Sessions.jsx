import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Loader, Button, Icon, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StudySessions } from '../../api/studysessions/StudySessions';
import DataTable from 'react-data-table-component';
import columns from '../components/sessions/columns';
import SessionCard from '../components/sessions/SessionCard';
import { createTheme } from '../components/sessions/theme';
import sessionsStyle from '../components/sessions/style';
import Fuse from 'fuse.js';

const options = {
  minMatchCharLength: 3,
  threshold: 0.2,
  keys: [
    'course',
    'topic',
    'description',
    'start',
    'end',
    'owner',
    'participants.grasshopper',
    'participants.sensei'
  ]
};

/** Renders a table containing all of the StudySessions. */
class Sessions extends React.Component {
  state = {
    session: {},
    searchString: '',
    resetPaginationToggle: false,
  };

  handleChange = (e, { name, value }) => {
    this.setState(
      {
        [name]: value,
        resetPaginationToggle: !this.state.resetPaginationToggle
      }
    )
  };

  /** Click handler for console logging */
  handleClick = () => {
    console.log();
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  };

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { session, searchString, resetPaginationToggle } = this.state;
    const { studysessions } = this.props;

    const fuse = new Fuse(studysessions, options);

    return (
        <Grid centered className='main-content'>
          <Grid.Row>
            <Grid.Column width={7}>
              <Header as='h2' textAlign='center'>Upcoming Sessions</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center' width={2}>
              <Input
                inverted
                size='mini'
                icon='search'
                placeholder='Filter'
                name='searchString'
                value={searchString}
                onChange={this.handleChange}
              />
              <br/>
                <div style={{
                  textAlign: 'left',
                  fontSize: '10px',
                  color: 'rgba(255,255,255,.5',
                  lineHeight: '1rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem'
                }}>
                  Try entering something like '05/12' or '07:30'. To search for a class, leave out the prefix. You can search for a person by their email.
                </div>
              <Button
                compact
                secondary
                as={Link}
                to='/add'
                key='add'
                content='Create Session'
              />
              <br/>
              <Button 
                compact
                onClick={this.handleClick}
                className='button-style'
                content='Console'
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <div style={{ 
                boxShadow: '-1px 5px 10px -6px black',
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
              }}>
              <DataTable
                noHeader
                columns={columns}
                data={
                  searchString === ''
                  ? studysessions
                  : _.pluck(fuse.search(searchString), 'item')
                }
                keyField={studysessions._id}
                dense
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
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
                onRowClicked={row => 
                  session === row 
                  ? this.setState({ session: {} })
                  : this.setState({ session: row })
                }
              />
              </div>
            </Grid.Column>
            <Grid.Column width={2}>
              <SessionCard studysession={session} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
};

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
    studysessions: StudySessions.find({}, { sort: { start: 1 } }).fetch(),
    ready: subscription.ready(),
  };
})(Sessions);

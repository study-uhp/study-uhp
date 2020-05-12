import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';
import { StudySessions } from '../../api/studysessions/StudySessions';
import SessionCard from '../components/sessions/SessionCard';
import '../components/calendar/react-big-calendar.css';

// Setup the localizer by providing the moment Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

const MySwal = withReactContent(Swal);

class Calendar extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { studysessions } = this.props;

    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <Header as="h2" textAlign="center">Calendar</Header>
            <div className='rbc-calendar-container'>
              <Cal
                  popup
                  events={studysessions}
                  titleAccessor={event => (
                      <div>
                        <div className='rbc-event-course'>
                          &nbsp;ICS{event.course}&nbsp;
                        </div>
                        <div className='rbc-event-topic'>
                          {event.topic}
                        </div>
                      </div>
                  )}
                  step={30}
                  localizer={localizer}
                  views={['month']}
                  toolbar={false}
                  selectable={false}
                  onSelectEvent={event => MySwal.fire({
                    showConfirmButton: false,
                    background: 'transparent',
                    width: 275,
                    padding: '0',
                    html: <SessionCard studysession={event} />,
                  })}
                  // onSelectEvent={event => console.log(event)}
              />
            </div>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of StudySessions in the props. */
Calendar.propTypes = {
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
})(Calendar);
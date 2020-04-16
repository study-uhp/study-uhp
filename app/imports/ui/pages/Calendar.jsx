import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import '../components/react-big-calendar.css';
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from '../components/events';

// Setup the localizer by providing the moment Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

class Calendar extends React.Component {
  render() {
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <Header as="h2" textAlign="center">Calendar</Header>
            <div style={{ height: '70vh'}} >
            <Cal
              popup
              events={events}
              step={30}
              localizer={localizer}
              views={['month', 'week', 'day']}
              toolbar={false}
              selectable={false}
              onSelectEvent={event => Swal.fire(event.title)}
            />
            </div>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Calendar;

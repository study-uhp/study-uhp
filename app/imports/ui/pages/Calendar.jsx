import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Calendar extends React.Component {
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Calendar</Header>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Calendar;

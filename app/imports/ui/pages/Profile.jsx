import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Calendar extends React.Component {
  render() {
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <Header as="h2" textAlign="center">Profile</Header>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Calendar;

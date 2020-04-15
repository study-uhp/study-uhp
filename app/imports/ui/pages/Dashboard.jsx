import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
export default class Dashboard extends React.Component {
  render() {
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <Header as="h2" textAlign="center"> User Dashboard</Header>
            <Header as="h4" textAlign="center">
              <p>Your upcoming sessions:</p>
            </Header>
          </Grid.Column>
        </Grid>
    );
  }
}

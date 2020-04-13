import React from 'react';
import { Header } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
export default class Dashboard extends React.Component {
  render() {
    return (
        <div>
          <Header as="h1" textAlign="center">
            <p>Dashboard</p>
          </Header>
          <Header as="h3" textAlign="center">
            <p>This is your upcoming sessions</p>
          </Header>
        </div>
    );
  }
}

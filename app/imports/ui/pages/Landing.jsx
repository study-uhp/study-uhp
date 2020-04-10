import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={8}>
            <h1>Study UHp Template</h1>
          </Grid.Column>

          <Grid.Column width={4}>
            <Image disabled size='tiny' src="/images/studyuhp_logo_square.png"/>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;

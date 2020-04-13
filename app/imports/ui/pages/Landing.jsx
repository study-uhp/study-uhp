import React from 'react';
import { Grid, Image, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { height: '100vh' };
    const buttonStyle = { color: '#000000', width: '200px', background: '#006400', marginBottom: '20px' };
    return (
        <div className='study-uhp-landing-background'>
          <Grid style={gridStyle} verticalAlign='middle' textAlign='center' container>
            <Grid.Column centered>
              <Grid.Row>
                <Image size='medium' src="/images/studyuhp_logo_square.png"/>
              </Grid.Row>
              <Grid.Row>
                <Button animated style={buttonStyle} as={NavLink} exact to="/signup">
                  <Button.Content visible>Sign Up</Button.Content>
                  <Button.Content hidden> <Icon name='arrow right '/></Button.Content>
                </Button>
              </Grid.Row>
              <Grid.Row/>
              <Grid.Row>
                <Button animated style={buttonStyle} as={NavLink} exact to="/signin">
                  <Button.Content visible>Log In</Button.Content>
                  <Button.Content hidden> <Icon name='arrow right '/></Button.Content>
                </Button>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;

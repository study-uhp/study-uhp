import React from 'react';
import { Grid, Image, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
export default class Landing extends React.Component {
  render() {
    const gridStyle = { height: '101vh' };
    const buttonStyle = {
      color: 'rgba(0, 0, 0, 0.8)',
      width: '150px',
      background: '#063f00',
      marginTop: '20px',
      fontSize: '19px',
    };
    const imageStyle = { size: 'medium' };
    return (
      <div className='study-uhp-landing-background'>
        <Grid style={gridStyle} verticalAlign='middle' textAlign='center' container>
          <Grid.Column>
            <Grid.Row>
              <Image style={imageStyle} src="/images/studyuhp_logo_square.png" centered/>
            </Grid.Row>
            <Grid.Row>
              <Button animated style={buttonStyle} as={Link} to="/signin">
                <Button.Content visible>Sign In</Button.Content>
                <Button.Content hidden> <Icon name='arrow right'/></Button.Content>
              </Button>
            </Grid.Row>
            <Grid.Row>
              <Button animated style={buttonStyle} as={Link} to="/signup">
                <Button.Content visible>Sign Up</Button.Content>
                <Button.Content hidden> <Icon name='arrow right'/></Button.Content>
              </Button>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

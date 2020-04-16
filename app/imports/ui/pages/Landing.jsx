import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import Tilt from 'react-parallax-tilt';

/** A simple static component to render some text for the landing page. */
export default class Landing extends React.Component {
  render() {
    const gridStyle = { height: '101vh' };
    const imageStyle = { size: 'large' };
    const align = {
      textAlign: 'center',
      color: 'white',
    };
    return (
        <div className='study-uhp-landing-background'>
          <Grid style={gridStyle} verticalAlign='middle' textAlign='center' container columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Tilt trackOnWindow={true} tiltReverse={true} style={imageStyle}>
                  <Image src="/images/studyuhp_logo_square.png" centered/>
                </Tilt>
              </Grid.Column>
              <Grid.Column>
                <Grid.Row textAlign='center'>
                  <div style={align}>
                    <Header inverted as="h3">Get the help you need</Header>
                    <p>Stuck on an assignment? Find others
                      who have previously completed the
                      same course to help you out!</p>
                    <Header inverted as="h3">Share your knowledge with others</Header>
                    <p>Feel confident in your abilities?
                      Take the skills you learned in a
                      class and use them to help some
                      one else succeed!</p>
                    <Header inverted as="h3">Collaborate in person</Header>
                    <p>Collaborate in real time by
                      working in the ICSpace. Get the
                      advantage of teamwork and
                      sharing of ideas in person!</p>
                  </div>
                </Grid.Row>
                <Grid.Row>
                  <a href="#/signin" className="animated-button6">
                    <span/>
                    <span/>
                    <span/>
                    <span/>Sign In
                  </a>
                  <a href="#/signup" className="animated-button6-rev">
                    <span/>
                    <span/>
                    <span/>
                    <span/>Sign Up
                  </a>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

import React from 'react';
import { Divider } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <Divider horizontal>ICS 314 Spring 2020 Final Project</Divider>
            <span>Aaron Banks, Michael Gainey, Jack Horton, Christian Jensen</span>
          </div>
        </footer>
    );
  }
}

export default Footer;

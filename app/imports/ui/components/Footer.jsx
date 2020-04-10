import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              ICS 314 Spring 2020 Final Project<br />
              Aaron Banks, Jack Horton, Michael Gainey, Christian Jensen<br />
          </div>
        </footer>
    );
  }
}

export default Footer;

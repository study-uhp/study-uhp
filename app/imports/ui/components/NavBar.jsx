import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Input, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', borderRadius: '0', height: '40px' };
    const logoStyle = { marginTop: '30px', background: 'transparent' };

    /** This would get changed to something like {this.props.currentuser.picture} */
    const trigger = (
        <span>
        <Image avatar src='/images/studyuhp_logo_square.png'/> {this.props.currentUser}
      </span>
    );

    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item style={logoStyle} as={NavLink} activeClassName="" exact to="/">
          <Image src='/images/studyuhp_logo_final_small.png'/>
        </Menu.Item>
        {this.props.currentUser ? ([
          <Menu.Item position="right" key='search'>
            <Input inverted transparent size='mini' className='icon' icon='search' placeholder='Search...'/>
          </Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/allsessions" key='allsessions'>All Sessions</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/sessions" key='sessions'>Sessions</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/calendar" key='calendar'>Calendar</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/dashboard" key='dashboard'>Dashboard</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/profile" key='profile'>Profile</Menu.Item>,
        ]) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        {this.props.currentUser === '' ? ( '' ) : (
          <Menu.Item>
            <Dropdown trigger={trigger} pointing="top right" icon={null}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Profile" as={NavLink} exact to="/profile"/>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);

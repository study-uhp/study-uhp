import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import Landing from '../pages/Landing';
import Sessions from '../pages/Sessions';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Home from '../pages/Home';
import Generate from '../components/Generate';
import Friends from '../pages/Friends';
import AddFriend from '../pages/AddFriend';
import SendMessage from '../pages/SendMessage';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBarRoute />
            <Switch>
              <LoggedInRoute exact path="/" component={Landing}/>
              <SignInSignUpRoute path="/signin" component={Signin}/>
              <SignInSignUpRoute path="/signup" component={Signup}/>
              <ProtectedRoute path="/home" component={Home}/>
              <ProtectedRoute path="/sessions" component={Sessions}/>
              <ProtectedRoute path="/calendar" component={Calendar}/>
              <ProtectedRoute path="/profile" component={Profile}/>
              {/* <AdminProtectedRoute path="/admin" component={Admin}/> */}
              <ProtectedRoute path="/signout" component={Signout}/>
              <ProtectedRoute path="/generate" component={Generate}/>
              <ProtectedRoute path="/addfriend" component={AddFriend}/>
              <ProtectedRoute path="/Friends" component={Friends}/>
              <ProtectedRoute path="/SendMessage" component={SendMessage}/>
              <Route component={NotFound}/>
            </Switch>
            <FooterRoute />
          </div>
        </Router>
    );
  }
}

const NavBarRoute = () => (
  <Route render={() => {
    const isLogged = Meteor.userId() !== null;
    return isLogged ? (<NavBar />) : ('');
    }}
  />
);

const FooterRoute = () => (
  <Route render={() => {
    const isLogged = Meteor.userId() !== null;
    return isLogged ? (<Footer />) : ('');
    }}
  />
);

const SignInSignUpRoute = ({ component: Component, ...rest }) => (
  <Route
      {...rest}
      render={(props) => {
        const isLogged = Meteor.userId() !== null;
        return isLogged ?
            (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>) :
            (<div><NavBar /><Component {...props} /><Footer /></div>
            );
      }}
  />
);

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
      {...rest}
      render={(props) => {
        const isLogged = Meteor.userId() !== null;
        return isLogged ?
            (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>) :
            (<Component {...props} />
            );
      }}
  />
);

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          return isLogged ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each SignInSignUpRoute. */
SignInSignUpRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each LoggedInRoute. */
LoggedInRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;

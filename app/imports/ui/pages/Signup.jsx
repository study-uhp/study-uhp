import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', firstName: '', lastName: '',
      password: '', about: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, firstName, lastName, password, about } = this.state;
    Accounts.createUser({ email, firstName,
      lastName, username: email, password, about }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <div style={{ width: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
              <Header as="h2" textAlign="left">
                Sign Up:
              </Header>
              <Segment inverted>
                <Form inverted onSubmit={this.submit}>
                  <Form.Input required
                    label="Email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                  />
                  <Form.Group inline widths='equal'>
                    <Form.Input required fluid
                      label="First name"
                      name="first name"
                      type='first name'
                      placeholder='First name'
                      onChange={this.handleChange}
                    />
                    <Form.Input required fluid
                      label="Last name"
                      name="last name"
                      type='last name'
                      placeholder='Last name'
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Input required
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Form.TextArea label='About' placeholder='Tell us more about you...' required/>
                  <Form.Button primary compact content="Submit"/>
                </Form>
              </Segment>
              <Message color='black'>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                <Message
                  color='black'
                  error
                  header="Registration was not successful"
                  content={this.state.error}
                />
              )}
              </div>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;

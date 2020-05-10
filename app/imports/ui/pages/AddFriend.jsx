import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { FriendsC, FriendsCSchema } from '../../api/friendsc/FriendsC';


/** Renders the Page for adding a document. */
class AddFriend extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { firstName, lastName, email } = data;
    const owner = Meteor.user().username;
    FriendsC.insert({ firstName, lastName, email, owner },
      (error) => {
        if (error) {
          Swal.fire('Error', error.message, 'error');
        } else {
          Swal.fire('Success', 'Friend added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms
   *
   * Right now this is just hacked together for testing. Everything should
   * not be just TextFields! Need to figure out the proper way to set up
   * the Schema and also Uniforms.
  */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Friend</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={FriendsCSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <TextField name='email'/>
                <TextField name='owner'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddFriend;

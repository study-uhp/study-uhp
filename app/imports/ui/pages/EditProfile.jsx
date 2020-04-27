import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
// import { StudySessions, StudySessionSchema } from '../../api/studysessions/StudySessions';
import { UserProfiles, UserProfileSchema } from '../../api/userprofiles/UserProfiles';

const MySwal = withReactContent(Swal);

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { 'name': first, 'name': last, bio, avatar, _id } = data;
    UserProfiles.update(_id, { $set: { 'name': first, 'name': last, bio, avatar } }, (error) => (error ?
      MySwal.fire('Error', error.message, 'error') :
      MySwal.fire('Success', 'Profile updated successfully', 'success').then(() => {
        window.location.href="./#/profile";
      })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <div style={{ width: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
              <Header as="h2" textAlign="center">Edit Profile</Header>
              <AutoForm schema={UserProfileSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                <Segment inverted>
                  <TextField name='name.first'/>
                  <TextField name='name.last'/>
                  <LongTextField name='bio'/>
                  <TextField name='avatar'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='user' />
                </Segment>
              </AutoForm>
            </div>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Session in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to StudySessions.
  const subscription = Meteor.subscribe('UserProfiles');
  return {
    doc: UserProfiles.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);

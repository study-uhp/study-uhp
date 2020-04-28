import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { StudySessions, StudySessionSchema } from '../../api/studysessions/StudySessions';

/** Renders the Page for editing a single document. */
class EditStudySessionAdmin extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { course, topic, date, timeBegin, timeEnd, _id } = data;
    StudySessions.update(_id, { $set: { course, topic, date, timeBegin, timeEnd } }, (error) => (error ?
      Swal.fire('Error', error.message, 'error') :
      Swal.fire('Success', 'Study session updated successfully', 'success')));
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
              <Header as="h2" textAlign="center">Edit Session Admin</Header>
              <AutoForm schema={StudySessionSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                <Segment inverted>
                  <TextField name='course'/>
                  <TextField name='topic'/>
                  <TextField name='date'/>
                  <TextField name='timeBegin'/>
                  <TextField name='timeEnd'/>
                  <SubmitField primary compact value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' />
                </Segment>
              </AutoForm>
            </div>
          </Grid.Column>
        </Grid>
    );
  }
}
// todo figure out how to make the forms show just like on EditStudySession.

/** Require the presence of a Session in the props object. Uniforms adds 'model' to the props, which we use. */
EditStudySessionAdmin.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to StudySessions.
  const subscription = Meteor.subscribe('StudySessions');
  return {
    doc: StudySessions.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStudySessionAdmin);

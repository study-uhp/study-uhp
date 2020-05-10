import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { StudySessions, StudySessionSchema } from '../../../api/studysessions/StudySessions';

/** Renders the Page for editing a single document. */
class EditSession extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { course, topic, description, start, end, _id } = data;
    StudySessions.update(_id, { $set: { course, topic, description, start, end } }, (error) => (error ?
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
            <div style={{ width: '400px' }}>
              <AutoForm schema={StudySessionSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                <Segment inverted>
                  <TextField name='course'/>
                  <TextField name='topic'/>
                  <LongTextField name='description'/>
                  <TextField name='start'/>
                  <TextField name='end'/>
                  <SubmitField value='Submit'/>
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

/** Require the presence of a Session in the props object. Uniforms adds 'model' to the props, which we use. */
EditSession.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to StudySessions.
  const subscription = Meteor.subscribe('StudySessions');
  return {
    ready: subscription.ready(),
  };
})(EditSession);

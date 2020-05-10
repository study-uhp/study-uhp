import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { StudySessions, StudySessionSchema } from '../../../api/studysessions/StudySessions';

/** Renders the Page for adding a document. */
class AddSession extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { course, topic, description, start, end } = data;
    const owner = Meteor.user().username;
    StudySessions.insert({ course, topic, description, start, end, owner },
      (error) => {
        if (error) {
          Swal.fire('Error', error.message, 'error');
        } else {
          Swal.fire('Success', 'Study session added successfully', 'success');
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
    return (
      <Grid container centered className="main-content">
        <Grid.Column>
          <div style={{ width: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            <AutoForm schema={StudySessionSchema} onSubmit={data => this.submit(data)} >
              <Segment inverted>
                <TextField name='course' placeholder="Course"/>
                <TextField name='topic' placeholder="Topic"/>
                <LongTextField name='description' placeholder="Description"/>
                <TextField name='start' placeholder="Start"/>
                <TextField name='end' placeholder="End"/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddSession;

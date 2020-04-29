import React from 'react';
import { Grid, Segment, Header, Message } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField } from 'uniforms-semantic';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2'; //eslint-disable-line
import { Meteor } from 'meteor/meteor';
// import SimpleSchema from 'simpl-schema';
import { StudySessions } from '../../api/studysessions/StudySessions';
import { StudentSessionSchema as formSchema } from '../forms/StudentSessionInfo';
import MultiSelectField from '../forms/controllers/MultiSelectField';

class AddStudySession extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: false };
  }

  submit(data, formRef) {
    let insertError;
    const { course, topic, date, timeBegin, timeEnd } = data;
    const owner = Meteor.user().username;
    StudySessions.insert({ course, topic, date, timeBegin, timeEnd, owner },
        (error) => {
          insertError = error;
        });
    if (insertError) {
      Swal.fire('Error', insertError.message, 'error');
    } else {
      Swal.fire('Success', 'Study session added successfully', 'success');
      // this.setState({ email });
      formRef.reset();
    }
  }

/** Create a schema to specify the structure of the data to appear in the form. */
// const formSchema = new SimpleSchema({
//   course: String,
//   topic: String,
//   date: String,
//   timeBegin: String,
//   timeEnd: String,
// });

/** Renders the Page for adding a document. */
// class AddStudySession extends React.Component {

  /** On submit, insert the data. */
  // submit(data, formRef) {
  //   const { course, topic, date, timeBegin, timeEnd } = data;
  //   const owner = Meteor.user().username;
  //   StudySessions.insert({ course, topic, date, timeBegin, timeEnd, owner },
  //     (error) => {
  //       if (error) {
  //         Swal.fire('Error', error.message, 'error');
  //       } else {
  //         Swal.fire('Success', 'Study session added successfully', 'success');
  //         formRef.reset();
  //       }
  //     });
  // }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms
   *
   * Right now this is just hacked together for testing. Everything should
   * not be just TextFields! Need to figure out the proper way to set up
   * the Schema and also Uniforms.
  */
  render() {
    let fRef = null;
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <div style={{ width: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
              <Header as="h2" textAlign="center">Add Session</Header>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                <Segment inverted>
                  <MultiSelectField inline name='course' showInLinError={true} placeholder={'ICS311'}/>
                  <TextField name='topic' showInLinError={true} placeholder={'Binary Search Trees'}/>
                  <DateField name='date' showInLinError={true} placeholder={'03/15/2020'}/>
                  <TextField name='timeBegin' showInLinError={true} placeholder={'0900'}/>
                  <TextField name='timeEnd' showInLinError={true} placeholder={'1000'}/>
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

export default AddStudySession;

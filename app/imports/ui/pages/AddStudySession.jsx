import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import Swal from 'sweetalert2';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@sweetalert2/theme-dark/dark.css';
import { StudySessions } from '../../api/studysessions/StudySessions';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  course: Number,
  topic: String,
  date: String,
  timeBegin: String,
  timeEnd: String,
});


/** Renders the Page for adding a document. */
class AddStudySession extends React.Component {
  state = {
    startDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
  };

  handleChange = date => {
    this.setState({
      startDate: date,
      startTime: date,
      endTime: date,
    });
  };

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { course, topic, date, timeBegin, timeEnd } = data;
    const owner = Meteor.user().username;
    StudySessions.insert({ course, topic, date, timeBegin, timeEnd, owner },
        (error) => {
          if (error) {
            Swal.fire('Error', error.message, 'error');
          } else {
            Swal.fire('Success', 'Study session added successfully', 'success');
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
        <Grid container centered className="main-content">
          <Grid.Column>
            <div style={{ width: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
              <Header as="h2" textAlign="center">Add Session</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
                <Segment inverted>
                  <NumField name='course' decimal={false} icon={false} placeholder="ICS311"/>
                  <TextField name='topic' placeholder="Binary Search Trees"/>
                  {/*<TextField name='date' placeholder="03/15/2020"/>*/}
                  <div className='customDatePickerWidth'>
                    <DatePicker name='date'
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                                popperPlacement="right-end"
                    />
                    <TextField name='timeBegin' placeholder="0900"/>
                    <DatePicker
                        name='timeBegin'
                        selected={this.state.startTime}
                        onChange={this.handleChange}
                        popperPlacement="right-end"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                    <DatePicker
                        name='timeEnd'
                        selected={this.state.endTime}
                        onChange={this.handleChange}
                        popperPlacement="right-end"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                    <TextField name='timeEnd' placeholder="1000"/>
                  </div>
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

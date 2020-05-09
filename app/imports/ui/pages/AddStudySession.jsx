import React from 'react';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField, NumField, ErrorField } from 'uniforms-semantic';
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
  course: String,
  topic: String,
  date: String,
  timeBegin: String,
  timeEnd: String,
});

/** Renders the Page for adding a document. */
class AddStudySession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      timeBegin: '',
      timeEnd: '',
      // Enable this if you want todays date to appear by default
      // startDate: moment()
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(dateName, dateValue) {
    if (dateName === 'date') {
      this.setState({
        date: dateValue,
      });
    }
    if (dateName === 'timeBegin') {
      this.setState({
        timeBegin: dateValue,
      });
    }
    if (dateName === 'timeEnd') {
      this.setState({
        timeEnd: dateValue,
      });
    }
  }

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
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                <Segment inverted>
                  <TextField name='course' placeholder="ICS311"/>
                  <TextField name='topic' placeholder="Binary Search Trees"/>
                  <div className='customDatePickerWidth form-group'>
                    <label className='control-label required' htmlFor='date'>Date</label>
                    <DatePicker name='date'
                                selected={this.state.date}
                                value={this.state.date}
                                onChange={date => this.handleDateChange('date', date)}
                                minDate={new Date()}
                                popperPlacement="right-end"
                                placeholderText={new Date().toLocaleDateString()}
                    />
                    <label className='control-label required' htmlFor='timeBegin'>Begin</label>
                    <DatePicker
                        name='timeBegin'
                        selected={this.state.timeBegin}
                        value={this.state.timeBegin}
                        onChange={date => this.handleDateChange('timeBegin', date)}
                        popperPlacement="right-end"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    />
                    <label className='control-label required' htmlFor='timeEnd'>End</label>
                    <DatePicker
                        name='timeEnd'
                        selected={this.state.timeEnd}
                        value={this.state.timeEnd}
                        onChange={date => this.handleDateChange('timeEnd', date)}
                        popperPlacement="right-end"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    />
                  </div>
                  <SubmitField value='Submit'/>
                  <ErrorField name="course"/>
                  <ErrorField name="topic"/>
                  <ErrorField name="date"/>
                  <ErrorField name="timeBegin"/>
                  <ErrorField name="timeEnd"/>
                </Segment>
              </AutoForm>
            </div>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddStudySession;

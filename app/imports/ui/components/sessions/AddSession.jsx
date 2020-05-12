import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { StudySessions, StudySessionSchema } from '../../../api/studysessions/StudySessions';

/** Renders the Page for adding a document. */
class AddSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      start: '',
      end: '',
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
    if (dateName === 'start') {
      this.setState({
        start: dateValue,
      });
    }
    if (dateName === 'end') {
      this.setState({
        end: dateValue,
      });
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { course, topic, description, date, start, end } = data;
    const owner = Meteor.user().username;
    StudySessions.insert({ course, topic, description, date, start, end, owner },
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
              <AutoForm schema={StudySessionSchema} onSubmit={data => this.submit(data)}>
                <Segment inverted>
                  <TextField name='course' placeholder="ICS311"/>
                  <TextField name='topic' placeholder="Binary Search Trees"/>
                  <LongTextField name='description' placeholder="Description"/>
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
                    <label className='control-label required' htmlFor='start'>Start</label>
                    <DatePicker
                        name='start'
                        selected={this.state.start}
                        value={this.state.start}
                        onChange={date => this.handleDateChange('start', date)}
                        popperPlacement="right-end"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    />
                    <label className='control-label required' htmlFor='end'>End</label>
                    <DatePicker
                        name='end'
                        selected={this.state.end}
                        value={this.state.end}
                        onChange={date => this.handleDateChange('end', date)}
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
                  <ErrorField name="description"/>
                  <ErrorField name="date"/>
                  <ErrorField name="start"/>
                  <ErrorField name="end"/>
                </Segment>
              </AutoForm>
            </div>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddSession;

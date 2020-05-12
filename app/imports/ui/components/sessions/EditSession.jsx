import React from 'react';
import { Grid, Loader, Segment } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  SubmitField,
  TextField,
  LongTextField,
  ErrorField
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { StudySessions, StudySessionSchema } from '../../../api/studysessions/StudySessions';

/** Renders the Page for editing a single document. */
class EditSession extends React.Component {
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

  /** On successful submit, insert the data. */
  submit(data) {
    const { course, topic, description, date, start, end, _id } = data;
    StudySessions.update(_id, { $set: { course, topic, description, date, start, end } }, (error) => (error ?
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
                    <label className='control-label required' htmlFor='start'>Begin</label>
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

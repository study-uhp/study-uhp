import React from 'react';
import moment from 'moment';
import { DateInput } from 'semantic-ui-calendar-react';
import { Form } from 'semantic-ui-react';

class SmallCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format('DD-MM-YYYY'),
      time: '',
      dateTime: '',
      datesRange: ''
    };
  }

  

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <Form inverted>
        <DateInput
          inverted
          inline
          name='date'
          value={this.state.date}
          onChange={this.handleChange}
          marked={[new Date()]}
          markColor='orange'
        />
      </Form>
    );
  }
}

export default SmallCalendar;

import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from 'semantic-ui-react';
import { StudySessions } from '../../../api/studysessions/StudySessions';

const MySwal = withReactContent(Swal);

class JoinPicker extends React.Component {

  joinGrasshopper(studysession) {
    StudySessions.update(
      { _id: studysession._id },
      { $addToSet: { 'participants.grasshopper': Meteor.user().username } },
      (error) => {
        if (error) {
          MySwal.fire('Error', error.message, 'error');
        } else {
          MySwal.fire('Success', 'Joined successfully', 'success');
        }
      },
    );
  }

  joinSensei(studysession) {
    StudySessions.update(
      { _id: studysession._id },
      { $addToSet: { 'participants.sensei': Meteor.user().username } },
      (error) => {
        if (error) {
          MySwal.fire('Error', error.message, 'error');
        } else {
          MySwal.fire('Success', 'Joined successfully', 'success');
        }
      },
    );
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.joinGrasshopper(this.props.studysession)}>Grasshopper</Button>
        <Button onClick={() => this.joinSensei(this.props.studysession)}>Sensei</Button>
      </div>
    );
  }
}

JoinPicker.propTypes = {
  studysession: PropTypes.object.isRequired,
};

export default JoinPicker;

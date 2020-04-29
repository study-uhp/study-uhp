import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Table, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { StudySessions } from '../../api/studysessions/StudySessions';

/** Renders a single row in the List Sessions table. See pages/ListStudySessions.jsx. */
class StudySessionAll extends React.Component {
  // state of Confirm.
  state = { open: false, result: false }

  // addUserToSession = () => this.props.studysession.participants.insert(this.props.userprofile._id)

  // function that is called when join button is clicked.
  show = () => this.setState({ open: true })

  // if user hits yes
  // = () => this.setState({ open: false, result: true })
  handleConfirm(data) {
    console.log(data);
    // const { "participants": participants, _id } = data;
    // const user = Meteor.user().user;
    // StudySessions.update(_id,
    //     { $push: { "participants": user } });
    // this.setState({ open: false });
  }

  // if user hits no
  handleCancel = () => this.setState({ open: false, result: false })

  render() {
    return (
        <Table.Row>
          <Table.Cell collapsing>{this.props.studysession.course}</Table.Cell>
          <Table.Cell>{this.props.studysession.topic}</Table.Cell>
          <Table.Cell collapsing>{this.props.studysession.date}</Table.Cell>
          <Table.Cell collapsing>
            {`${this.props.studysession.timeBegin} - ${this.props.studysession.timeEnd}`}
          </Table.Cell>
          <Table.Cell collapsing>
            <Button onClick={this.show} secondary compact content='Join'/>
            <Confirm
                open={this.state.open}
                cancelButton='Never mind'
                confirmButton="Let's do it"
                content='Would you like to join this session?'
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
                size='mini'
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Link to={`/viewstudysession/${this.props.studysession._id}`}>
              <Button secondary compact content='View'/>
            </Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StudySessionAll.propTypes = {
  studysession: PropTypes.object.isRequired,
  userprofile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
// export default withRouter(StudySessionAll);

export default withTracker(() => {
  // Get access to Sessions.
  const subscription1 = Meteor.subscribe('UserProfiles');
  const subscription2 = Meteor.subscribe('StudySessions');
  return {
    studysessions: StudySessions.find({}).fetch(),
    // userprofile: UserProfiles.find({}).fetch(),
    userprofile: UserProfiles.findOne({}),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(StudySessionAll);

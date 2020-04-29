import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Table, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { StudySessions } from '../../api/studysessions/StudySessions';

/** Renders a single row in the List Sessions table. See pages/ListStudySessions.jsx. */
class StudySessionAll extends React.Component {

  state = { open: false, result: 'show the modal to capture a result' }

  show = () => this.setState({ open: true })

  // handleConfirm = () => this.setState({ result: 'confirmed', open: false })

  handleConfirm(data) {
    const { "participants": participants, _id } = data;
    console.log(data);
    const user = Meteor.userId().username();
    console.log(user);
    // StudySessions.update(_id, { $addToSet: { "participants": user } });
    //this.setState({ open: false });
  }

  handleCancel = () => this.setState({ result: 'cancelled', open: false })

  render() {

    const { open } = this.state;

    return (
        <Table.Row>
          <Table.Cell collapsing>{this.props.studysession.course}</Table.Cell>
          <Table.Cell>{this.props.studysession.topic}</Table.Cell>
          <Table.Cell collapsing>{this.props.studysession.date}</Table.Cell>
          <Table.Cell collapsing>
            {`${this.props.studysession.timeBegin} - ${this.props.studysession.timeEnd}`}
          </Table.Cell>
          <Table.Cell collapsing>
            <Button secondary compact content='Join' onClick={this.show}/>
            <Confirm
                open={open}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
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
  UserProfiles: PropTypes.object,
};
//
// /** Wrap this component in withRouter since we use the <Link> React Router element. */
// export default withRouter(StudySessionAll);

export default withTracker(() => {
  // Get access to Sessions.
  const subscription = Meteor.subscribe('StudySessionsAll');
  const subscription1 = Meteor.subscribe('UserProfiles');
  return {
    studysessions: StudySessions.find({}).fetch(),
    ready: subscription.ready() && subscription1.ready(),
  };
})(StudySessionAll);

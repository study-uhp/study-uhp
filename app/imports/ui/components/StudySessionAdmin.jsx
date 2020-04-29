import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


/** Renders a single row in the List Sessions (Admin) table. See pages/ListStudySessionsAdmin.jsx. */
class StudySessionAdmin extends React.Component {

  // delete session function. Removes the study session with accociated id.
  deleteSession(docID) {
    // console.log(`${docID}`);
    this.props.StudySessions.remove(docID);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell collapsing>{this.props.studysession.course}</Table.Cell>
          <Table.Cell>{this.props.studysession.topic}</Table.Cell>
          <Table.Cell collapsing>{this.props.studysession.date}</Table.Cell>
          <Table.Cell collapsing>
            {`${this.props.studysession.timeBegin} - ${this.props.studysession.timeEnd}`}
          </Table.Cell>
          <Table.Cell collapsing>{this.props.studysession.owner}</Table.Cell>
          <Table.Cell collapsing>
            <Link to={`/edit/${this.props.studysession._id}`}>
              <Button secondary compact content='Edit'/>
            </Link>
          </Table.Cell>
          <Table.Cell collapsing>
            <Button onClick={() => this.deleteSession(this.props.studysession._id)}
                    secondary compact content='Delete'/>
          </Table.Cell>
        </Table.Row>

    );
  }
}

// todo make a secondary action to delete. Can use Confirm from react.semantic-ui.

/** Require a document to be passed to this component. */
StudySessionAdmin.propTypes = {
  studysession: PropTypes.object.isRequired,
  // StudySessions is
  StudySessions: PropTypes.object.isRequired,
};

export default StudySessionAdmin;

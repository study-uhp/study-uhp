import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Sessions (Admin) table. See pages/ListStudySessionsAdmin.jsx. */
class StudySessionAdmin extends React.Component {
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
            <Link to={`/editadmin/${this.props.studysession._id}`}><Icon name='edit'/></Link>
          </Table.Cell>
          <Table.Cell collapsing>
            <Link to={`/viewstudysessionadmin/${this.props.studysession._id}`}>View session</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}
// todo put in a button that allows for admins to take or give points.

/** Require a document to be passed to this component. */
StudySessionAdmin.propTypes = {
  studysession: PropTypes.object.isRequired,
};

export default StudySessionAdmin;

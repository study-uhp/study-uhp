import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
          <Table.Cell collapsing><Button secondary compact content='Delete' /></Table.Cell>
        </Table.Row>
    );
  }
}
// todo implement delete session button.

/** Require a document to be passed to this component. */
StudySessionAdmin.propTypes = {
  studysession: PropTypes.object.isRequired,
};

export default StudySessionAdmin;

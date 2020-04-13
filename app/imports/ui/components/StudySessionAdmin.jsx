import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Sessions (Admin) table. See pages/ListStudySessionsAdmin.jsx. */
class StudySessionAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.studysession.course}</Table.Cell>
          <Table.Cell>{this.props.studysession.topic}</Table.Cell>
          <Table.Cell>{this.props.studysession.date}</Table.Cell>
          <Table.Cell>
            {`${this.props.studysession.timeBegin} - ${this.props.studysession.timeEnd}`}
          </Table.Cell>
          <Table.Cell>{this.props.studysession.owner}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StudySessionAdmin.propTypes = {
  studysession: PropTypes.object.isRequired,
};

export default StudySessionAdmin;
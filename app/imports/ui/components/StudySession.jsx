import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Sessions table. See pages/ListStudySessions.jsx. */
class StudySession extends React.Component {
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
            <Link to={`/edit/${this.props.studysession._id}`}>
              <Icon name={'cog'}/>
            </Link>
          </Table.Cell>
          <Table.Cell collapsing>
            <Link to={`/viewstudysession/${this.props.studysession._id}`}>
              <Button secondary compact content='View' />
            </Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StudySession.propTypes = {
  studysession: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudySession);

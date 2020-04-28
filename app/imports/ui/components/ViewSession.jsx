import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Sessions table. See pages/ListStudySessions.jsx. */
class ViewSession extends React.Component {
  render() {
    return (
        <Segment.Group inverted>
          <Segment inverted><Header as="h1" textAlign="center">View Session</Header></Segment>
          <Segment.Group inverted>
            <Segment><Header textAlign="center" as="h4">{this.props.studysession.course}</Header></Segment>
            <Segment><Header textAlign="center" as="h4">{this.props.studysession.topic}</Header></Segment>
          </Segment.Group>
          <Segment.Group horizonta inverted>
            <Segment><Header textAlign="center" as="h4">{this.props.studysession.date}</Header></Segment>
            <Segment><Header textAlign="center" as="h4">{this.props.studysession.timeBegin}</Header></Segment>
            <Segment><Header textAlign="center" as="h4">{this.props.studysession.timeEnd}</Header></Segment>
          </Segment.Group>
          <Segment inverted><Header textAlign="center" as="h4">{this.props.studysession.owner}</Header></Segment>
        </Segment.Group>
    );
  }
}

/** Require a document to be passed to this component. */
ViewSession.propTypes = {
  studysession: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ViewSession);

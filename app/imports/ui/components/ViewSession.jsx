import React from 'react';
import { Header, Segment, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Sessions table. See pages/ListStudySessions.jsx. */
class ViewSession extends React.Component {
  render() {
    return (
        <div>
          <Segment.Group size='small'>
            <Segment inverted={true}><Header as="h1" textAlign="center">View Session</Header></Segment>
            <Segment.Group>
              <Segment><Header textAlign="center" as="h4">{this.props.studysession.course}</Header></Segment>
              <Segment><Header textAlign="center" as="h4">{this.props.studysession.topic}</Header></Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment inverted={true}>
                <Header textAlign="center" as="h4">Date: {this.props.studysession.date}</Header>
              </Segment>
              <Segment inverted={true}>
                <Header textAlign="center" as="h4">Start: {this.props.studysession.timeBegin}</Header>
              </Segment>
              <Segment inverted={true}>
                <Header textAlign="center" as="h4">End: {this.props.studysession.timeEnd}</Header>
              </Segment>
            </Segment.Group>
            <Segment><Header textAlign="center" as="h4">Owner: {this.props.studysession.owner}</Header></Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment.Group>
              <Segment inverted={true}><Header textAlign="center" as='h3'>Senseis</Header></Segment>
              <List>
                <List.Item>{this.props.studysession.participants}</List.Item>
              </List>
            </Segment.Group>
            <Segment.Group>
              <Segment inverted={true}><Header textAlign="center" as='h3'>Grasshoppers</Header></Segment>
            </Segment.Group>
          </Segment.Group>
        </div>
    );
  }
}
// todo make two separate lists for grasshoppers and senseis that pull from the collection.

/** Require a document to be passed to this component. */
ViewSession.propTypes = {
  studysession: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ViewSession);

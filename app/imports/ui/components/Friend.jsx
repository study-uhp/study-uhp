import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Friend extends React.Component {
    render() {
        return (
            <Card centered>
                <Card.Content>
                    <Card.Header>{this.props.friend.firstName} {this.props.friend.lastName}</Card.Header>
                    <Card.Meta>{this.props.friend.email}</Card.Meta>
                </Card.Content>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
Friend.propTypes = {
  friend: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Friend);

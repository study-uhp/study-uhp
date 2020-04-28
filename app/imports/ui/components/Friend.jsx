import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Friend extends React.Component {
  render() {
    return (
        <Card container centered className="Card-style">
            <Card.Content header={this.props.friend.firstName} textAlign="center"/>
            <Card.Content
                style={{
                    height: '200px',
                    backgroundImage: 'url(images/user.png)',
                    backgroundSize: 'cover',
                }}
            ></Card.Content>
            <Card.Content>
                <Button container className="button-style" floated="left">Message</Button>
                <Button container className="button-style" floated="right">Remove</Button>
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

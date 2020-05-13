import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {
    render() {
        return (
            <Card>
                <Card.Header>To {this.props.message.to} from {this.props.message.from}</Card.Header>
                <Card.Body>
                    <Card.Title>Message:</Card.Title>
                    <Card.Text>
                        {this.props.message.body}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
Message.propTypes = {
    message: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Message);

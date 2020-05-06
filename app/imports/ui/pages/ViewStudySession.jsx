import React from 'react';
import { Grid, Loader, Header, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { StudySessions } from '../../api/studysessions/StudySessions';
import ViewSession from '../components/ViewSession';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';

/** Renders the Page for editing a single document. */
class ViewStudySession extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  handleClick(returnToClick) {
    StudySessions.update(
        { _id: returnToClick.doc._id },
        { $addToSet: { participants: returnToClick.user.user } },
        (error) => {
          if (error) {
            Swal.fire('Error', error.message, 'error');
          } else {
            Swal.fire('Success', 'Joined successfully', 'success');
            console.log(returnToClick.doc.participants);
          }
        },
    );
  }

  /** Render the page and read ViewSession component */
  renderPage() {
    const returnToClick = { doc: this.props.doc, user: this.props.user };
    return (
        <Grid container centered className="main-content">
          <Grid.Row>
            <Grid.Column>
              <ViewSession studysession={this.props.doc}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button inverted color='green'
                      onClick={() => this.handleClick(returnToClick)}
                      content='Join Session'
                      size='small'
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require the presence of a Session in the props object. Uniforms adds 'model' to the props, which we use. */
ViewStudySession.propTypes = {
  doc: PropTypes.object,
  user: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to StudySessions.
  const subscription = Meteor.subscribe('ViewStudySession');
  const subscription2 = Meteor.subscribe('UserProfiles');
  return {
    doc: StudySessions.findOne(documentId),
    user: UserProfiles.findOne(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ViewStudySession);

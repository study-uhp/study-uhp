import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { StudySessions, StudySessionSchema } from '../../api/studysessions/StudySessions';
import ListStudySessions from './ListStudySessions';
import ViewSession from '../components/ViewSession';

/** Renders the Page for editing a single document. */
class ViewStudySession extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <Header as="h1" textAlign="center">View Session</Header>
            <ViewSession/>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Session in the props object. Uniforms adds 'model' to the props, which we use. */
ViewStudySession.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to StudySessions.
  const subscription = Meteor.subscribe('StudySessions');
  return {
    doc: StudySessions.findOne(documentId),
    ready: subscription.ready(),
  };
})(ViewStudySession);

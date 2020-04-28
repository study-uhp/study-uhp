import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { StudySessions } from '../../api/studysessions/StudySessions';
import ViewSession from '../components/ViewSession';
import ViewSessionAdmin from '../components/ViewSessionAdmin';

/** Renders the Page for editing a single document. */
class ViewStudySessionAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page and read ViewSession component */
  renderPage() {
    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <ViewSessionAdmin studysession={this.props.doc}/>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Session in the props object. Uniforms adds 'model' to the props, which we use. */
ViewStudySessionAdmin.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to StudySessions.
  const subscription = Meteor.subscribe('ViewStudySession');
  return {
    doc: StudySessions.findOne(documentId),
    ready: subscription.ready(),
  };
})(ViewStudySessionAdmin);

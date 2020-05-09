import React from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { CourseList } from '../../api/courselist/CourseList';
import MultiSelectField from '../components/MultiSelectField';

const MySwal = withReactContent(Swal);

const editProfileSchema = (allCourses) => new SimpleSchema({
  user: String,
  name: Object,
  'name.first': String,
  'name.last': String,
  bio: String,
  avatar: {
    type: String,
    optional: true,
  },
  courses: Object,
  'courses.grasshopper': {
    type: Array,
    optional: true,
  },
  'courses.grasshopper.$': {
    type: String,
    optional: true,
    allowedValues: allCourses,
  },
  'courses.sensei': {
    type: Array,
    optional: true,
  },
  'courses.sensei.$': {
    type: String,
    optional: true,
    allowedValues: allCourses,
  },
  points: Number,
});


/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, bio, avatar, courses, _id } = data;
    UserProfiles.update(_id, {
      $set: { name, bio, avatar, courses },
    }, (error) => (error ?
      MySwal.fire('Error', error.message, 'error') :
      MySwal.fire('Success', 'Profile updated successfully', 'success').then(() => {
        // eslint-disable-next-line no-undef
        window.location.href = './#/profile';
      })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {

    const allCourses = _.pluck(CourseList.find().fetch(), 'course');
    const formSchema = editProfileSchema(allCourses);

    return (
        <Grid container centered className="main-content">
          <Grid.Column>
            <div style={{ width: '450px', marginLeft: 'auto', marginRight: 'auto' }}>
              <Header as="h2" textAlign="center">Edit Profile</Header>
              <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                <Segment inverted>
                  <Form.Group widths={'equal'}>
                    <TextField name='name.first'/>
                    <TextField name='name.last'/>
                  </Form.Group>
                  <LongTextField name='bio'/>
                  <TextField name='avatar'/>
                  <MultiSelectField name='courses.grasshopper'/>
                  <MultiSelectField name='courses.sensei'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='user' />
                  <HiddenField name='points' />
                </Segment>
              </AutoForm>
            </div>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Session in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  clist: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to StudySessions.
  const subscription = Meteor.subscribe('UserProfiles');
  const sub2 = Meteor.subscribe('CourseList');
  return {
    doc: UserProfiles.findOne(documentId),
    clist: CourseList.find().fetch(),
    ready: subscription.ready() && sub2.ready(),
  };
})(EditProfile);

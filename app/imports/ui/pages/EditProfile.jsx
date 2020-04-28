import React from 'react';
import { Grid, Loader, Header, Segment, Form, Dropdown, Button } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField, LongTextField, ListField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
// import { StudySessions, StudySessionSchema } from '../../api/studysessions/StudySessions';
import { UserProfiles, UserProfileSchema } from '../../api/userprofiles/UserProfiles';
import { CourseList, CourseListSchema } from '../../api/courselist/CourseList';
import MultiSelectField from '../components/MultiSelectField';

const MySwal = withReactContent(Swal);

const options = [
  { key: '111', text: '111', value: '111' },
  { key: '222', text: '222', value: '222' },
  { key: '333', text: '333', value: '333' },
  { key: '444', text: '444', value: '444' },
];

// const options = _.map(allowedValues, (val, index) => ({
//   key: index,
//   text: transform ? transform(val) : val,
//   value: val,
// }));


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
  'courses.grasshopper': Array,
  'courses.grasshopper.$': {type: String, allowedValues: allCourses },
  'courses.sensei': Array,
  'courses.sensei.$': {type: String, allowedValues: allCourses },
});


/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {
  
  handleClick = () => {
    console.log(this.props.clist);
    console.log(allCourses);
    console.log(CourseList.find().fetch())
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { 'name': first, 'name': last, bio, avatar, _id } = data;
    UserProfiles.update(_id, { $set: { 'name': first, 'name': last, bio, avatar } }, (error) => (error ?
      MySwal.fire('Error', error.message, 'error') :
      MySwal.fire('Success', 'Profile updated successfully', 'success').then(() => {
        window.location.href="./#/profile";
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
                  {/* <Dropdown name='courses.grasshopper' placeholder='grasshopper' multiple selection 
                    options={this.props.doc.courses.grasshopper} /> */}
                    <MultiSelectField name='courses.grasshopper' showInlineError={true} placeholder={'Grasshopper'}/>
                    <MultiSelectField name='courses.sensei' showInlineError={true} placeholder={'Sensei'}/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='user' />
                </Segment>
              </AutoForm>
              {/* <Dropdown name='courses.grasshopper' onChange={this.handleChange} placeholder='Skills' multiple selection options={options} /> */}
              <Button onClick={this.handleClick}>Console</Button>
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

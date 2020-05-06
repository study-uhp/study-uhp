import { Meteor } from 'meteor/meteor';
import { StudySessions } from '../../api/studysessions/StudySessions';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { CourseList } from '../../api/courselist/CourseList'
import { icsCourses } from '../../api/courselist/CourseList.json'
import generateUsers from '../../api/generator/usergenerator';
import generateSessions from '../../api/generator/sessiongenerator'

/* eslint-disable no-console */

function addProfiles(data) {
  console.log(`  Adding profile: ${data.user}`);
  UserProfiles.insert(data);
}

/** Initialize the collection if empty. */
if (UserProfiles.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default user profile(s)');
    Meteor.settings.defaultProfiles.map(data => addProfiles(data));
  }
}

function addCourses(data) {
  CourseList.insert(data);
}

/** Initialize the collection if empty. */
if (CourseList.find().count() === 0) {
  if (icsCourses) {
    console.log('Creating ICS course listing...');
    icsCourses.map(data => addCourses(data));
  }
}


/** Adding the mock users */
function createUser(user, role) {
  const userID = Accounts.createUser({ username: user, email: user, password: 'changeme' });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ user, name, major, year, avatar, courses, points, bio, role }) {
  console.log(`Defining profile ${user}`);
  // Define the user in the Meteor accounts package.
  createUser(user, role);
  // Create the profile.
  UserProfiles.insert({ user, name, major, year, avatar, courses, points, bio });
}

function addSessions(data) {
  StudySessions.insert(data);
  console.log('Generated random session');
}

if ((Meteor.settings.generateData) && (Meteor.users.find().count() < 3)) {

  const userlist = generateUsers(Meteor.settings.generateData.users);
  console.log('Generating random user list...');

  const sessionlist = generateSessions(Meteor.settings.generateData.sessions, userlist);
  console.log('Generating random session list...');

  userlist.map(profile => addProfile(profile));
  sessionlist.map(sessions => addSessions(sessions));
}

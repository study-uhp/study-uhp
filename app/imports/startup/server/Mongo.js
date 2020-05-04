import { Meteor } from 'meteor/meteor';
import { StudySessions } from '../../api/studysessions/StudySessions';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { CourseList } from '../../api/courselist/CourseList'
import { icsCourses } from '../../api/courselist/CourseList.json'
import { FriendsC } from '../../api/friendsc/FriendsC';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.course} (${data.date})`);
  StudySessions.insert(data);
}

/** Initialize the collection if empty. */
if (StudySessions.find().count() === 0) {
  if (Meteor.settings.defaultStudySessions) {
    console.log('Creating default study sessions.');
    Meteor.settings.defaultStudySessions.map(data => addData(data));
  }
}

/** Initialize the database with a default data document. */
function addFriend(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  FriendsC.insert(data);
}

/** Initialize the collection if empty. */
if (FriendsC.find().count() === 0) {
  if (Meteor.settings.defaultFriendList) {
    console.log('Creating default friends list.');
    Meteor.settings.defaultFriendList.map(data => addFriend(data));
  }
}

function addProfiles(data) {
  console.log(`  Adding profile: ${data.user}`);
  UserProfiles.insert(data);
}

/** Initialize the collection if empty. */
if (UserProfiles.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default user profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfiles(data));
  }
}

function addCourses(data) {
  console.log(`  Adding course: ${data.course}`);
  CourseList.insert(data);
}

/** Initialize the collection if empty. */
if (CourseList.find().count() === 0) {
  if (icsCourses) {
    console.log('Creating ICS course listing.');
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
function addProfile({ user, name, bio, avatar, courses, points, role }) {
  console.log(`Defining profile ${user}`);
  // Define the user in the Meteor accounts package.
  createUser(user, role);
  // Create the profile.
  UserProfiles.insert({ user, name, bio, avatar, courses, points });
}

function addSessions(data) {
  StudySessions.insert(data);
}

if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 3)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
  jsonData.sessions.map(sessions => addSessions(sessions));
}

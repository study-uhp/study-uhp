import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { StudySessions } from '../../api/studysessions/StudySessions';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { CourseList } from '../../api/courselist/CourseList';

/** This subscription publishes all documents regardless of user, but only if logged in. */
Meteor.publish('StudySessionsAll', function publish() {
  if (this.userId) {
    return StudySessions.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('StudySessions', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return StudySessions.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StudySessionsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return StudySessions.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('UserProfiles', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return UserProfiles.find({ user: username });
  }
  return this.ready();
});

Meteor.publish('AllUserProfiles', function publish() {
  if (this.userId) {
    return UserProfiles.find();
  }
  return this.ready();
});

Meteor.publish('CourseList', function publish() {
  if (this.userId) {
    return CourseList.find();
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if logged in. */
Meteor.publish('ViewStudySession', function publish() {
  if (this.userId) {
    return StudySessions.find();
  }
  return this.ready();
});

import { Meteor } from 'meteor/meteor';
import { StudySessions } from '../../api/studysessions/StudySessions';
import { FriendsC } from '../../api/friends/FriendsC';
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

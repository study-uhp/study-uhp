import { Meteor } from 'meteor/meteor';
import { StudySessions } from '../../api/studysessions/StudySessions';

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

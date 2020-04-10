import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const StudySessions = new Mongo.Collection('StudySessions');

/** Define a schema to specify the structure of each document in the collection. */
const StudySessionSchema = new SimpleSchema({
  course: String,
  topic: String,
  date: String,
  timeBegin: String,
  timeEnd: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
StudySessions.attachSchema(StudySessionSchema);

/** Make the collection and schema available to other code. */
export { StudySessions, StudySessionSchema };

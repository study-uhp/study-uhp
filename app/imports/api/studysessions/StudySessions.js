import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const StudySessions = new Mongo.Collection('StudySessions');

const StudentSessionValues = {
  course: ['ICS314', 'ICS111', 'ICS241', 'ICS311', 'ICS313', 'ICS212', 'ICS313'],
};

/** Define a schema to specify the structure of each document in the collection. */
const StudySessionSchema = new SimpleSchema({
  course: { type: Array, optional: false },
  'course.$': { type: String, allowedValues: StudentSessionValues.course },
  topic: String,
  date: Date,
  timeBegin: String,
  timeEnd: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
StudySessions.attachSchema(StudySessionSchema);

/** Make the collection and schema available to other code. */
export { StudentSessionValues, StudySessions, StudySessionSchema };

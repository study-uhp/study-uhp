import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const StudySessions = new Mongo.Collection('StudySessions');

/** Define a schema to specify the structure of each document in the collection. */
const StudySessionSchema = new SimpleSchema({
  course: String,
  topic: String,
  description: String,
  start: String,
  end: String,
  owner: String,
  participants: Object,
  'participants.grasshopper': Array,
  'participants.grasshopper.$': {
    type: String,
    optional: true,
  },
  'participants.sensei': Array,
  'participants.sensei.$': {
    type: String,
    optional: true,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
StudySessions.attachSchema(StudySessionSchema);

/** Make the collection and schema available to other code. */
export { StudySessions, StudySessionSchema };
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const UserProfiles = new Mongo.Collection('UserProfiles');

/** Define a schema to specify the structure of each document in the collection. */
const UserProfileSchema = new SimpleSchema({
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
  'courses.grasshopper.$': {
    type: String,
    optional: true,
  },
  'courses.sensei': Array,
  'courses.sensei.$': {
    type: String,
    optional: true,
  },
  points: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
UserProfiles.attachSchema(UserProfileSchema);

/** Make the collection and schema available to other code. */
export { UserProfiles, UserProfileSchema };

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const CourseList = new Mongo.Collection('CourseList');

/** Define a schema to specify the structure of each document in the collection. */
const CourseListSchema = new SimpleSchema({
  course: String,
  title: String,
  description: String,
  credits: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
CourseList.attachSchema(CourseListSchema);

/** Make the collection and schema available to other code. */
export { CourseList, CourseListSchema };

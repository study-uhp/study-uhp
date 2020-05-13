import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Messages = new Mongo.Collection('Messages');

/** Define a schema to specify the structure of each document in the collection. */
const MessagesSchema = new SimpleSchema({
    to: String,
    from: String,
    body: String,
    owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Messages.attachSchema(MessagesSchema);

/** Make the collection and schema available to other code. */

export { Messages, MessagesSchema };

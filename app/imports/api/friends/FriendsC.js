import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const FriendsC = new Mongo.Collection('FriendsC');

/** Define a schema to specify the structure of each document in the collection. */
const FriendsCSchema = new SimpleSchema({
<<<<<<< Updated upstream
  firstName: String,
  lastName: String,
  email: String,
=======
    firstName: String,
    lastName: String,
    email: String,
>>>>>>> Stashed changes
}, { tracker: Tracker });

/** Attach this schema to the collection. */
FriendsC.attachSchema(FriendsCSchema);

/** Make the collection and schema available to other code. */
<<<<<<< Updated upstream
export { FriendsC, FriendsCSchema };
=======
export { FriendsC, FriendsCSchema };
>>>>>>> Stashed changes

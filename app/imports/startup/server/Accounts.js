import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, firstName, lastName, password, about, role, points) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    about: about,
    // points are added to schema for game.
    amountOfPoints: points,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    // eslint-disable-next-line max-len
    Meteor.settings.defaultAccounts.map(({ email, firstName, lastName, password, about, role, amountOfPoints }) => createUser(email, firstName, lastName, password, about, role, amountOfPoints));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

import dayjs from 'dayjs';
import faker from 'faker';
import { _ } from 'meteor/underscore';
import { icsCourses } from '../courselist/CourseList.json'

/** Pluck out all of the course numbers from the master list */
const courselist = _.pluck(icsCourses, 'course');

/** List of possible days to pick from for session date generation */
const pDay = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30
];

/** List of possible hours for session time generation */
const pHour = [ 
  7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
];

/** List of possible lengths for sessions. Weighted towards 30-90 */
const pMin = [
  30, 45, 60, 75, 90,
  30, 45, 60, 75, 90,
  30, 45, 60, 75, 90,
  105, 120,
];

/** 
 * Generate a list of session. Returns an array full of objects, where each object
 * is a single session. Number passed in is the number of sesseions to generate.
 * A list of users needs to be passed in as well for the generator to work, as it
 * picks an owner from the list and then builds the list of grasshoppers and senseis
 * from the list while removing the chosen users at each pass to stop duplicates.
 * The start date is generate from the current year and month, and then a random day,
 * time, and length are picked.
 */
export default function generateSessions(num, userlist) {
  const sessionlist = [];
  const list = userlist || [];

  for (let i = 0; i < num; i++) {
    const start = dayjs(
      dayjs().year() +
      '-' +
      (dayjs().month() + 1) +
      '-' +
      _.sample(pDay) +
      "T" +
      _.sample(pHour) +
      ":" +
      _.sample([ 15, 30, 45 ])
      );
    const end = start.add(_.sample(pMin), 'minute');

    const listofusers = _.pluck(list, 'user');
    const owner = _.sample(listofusers);
    const noowner = _.difference(listofusers, owner);
    const grasshoppers = _.sample(noowner, _.random(1,5));
    const nograss = _.difference(noowner, grasshoppers);
    const senseis = _.sample(nograss, _.random(1,5));

    const sessionObj = {
      course: _.sample(courselist),
      topic: faker.lorem.sentence(5),
      description: faker.lorem.sentences(_.random(2,3)),
      start: start.toJSON(),
      end: end.toJSON(),
      owner: owner,
      participants: {
        grasshopper: grasshoppers,
        sensei: senseis,
      }
    };

    sessionlist.push(sessionObj);
  }

  return sessionlist;
}

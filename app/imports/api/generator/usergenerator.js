import faker from 'faker';
import { icsCourses } from '../courselist/CourseList.json'

/** Pluck out all of the course numbers from the master list */
const courselist = _.pluck(icsCourses, 'course');

/** 
 * Generate a list of users. Returns an array full of objects, where each object
 * is a single user. Number passed in is the number of users to generate.
 */
export default function generateUsers(num) {
  const userlist = [];

  for (let i = 0; i < num; i++) {

    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();

    const year = _.sample([
      "Freshman",
      "Sophomore",
      "Junior",
      "Senior"
    ]);
    const major = _.sample([
      "Computer Science",
      "Computer Engineering",
      "Data Science",
      "Security Science"
    ]);

    const profileObject = {
      username: (
        firstname.charAt(0) +
        lastname +
        _.random(2,9) +
        "@hawaii.edu"
      )
        .toLowerCase()
        .replace(/[^a-z0-9@.]/g, ''),
      name: {
        first: firstname,
        last: lastname,
      },
      major: major,
      year: year,
      avatar: faker.image.avatar(),
      courses: getCourses(year, courselist),
      points: _.random(100,1000),
      bio: "Hi. My name is " +
        firstname +
        " and I am a " +
        year.toLowerCase() +
        " studying " +
        major.toLowerCase() +
        " at UH Manoa."
    };

    userlist.push(profileObject);
  }

  return userlist;
}

/**
 * Helper function for the user generator that generates a list of courses.
 * Returns an object with both grasshopper and sensei course listings for a
 * user. There is some (rough) logic built in that tries to make the courses
 * somewhat reasonable based on the year of the student. So a freshman doesnt
 * end up as a sensei for a 400-level course etc. The random number of courses
 * chosen per user per year is weighted to be a bit more realistic also.
 */
function getCourses(year, courses) {
  const courseObj = {};
  
  if (year === "Freshman") {
    const s = _.filter(courses, function(c){
      return c.charAt(0) == 1;
    });
    courseObj.sensei = _.sample(s, _.random(1,2));
    const newcourses = _.difference(courses, courseObj.sensei);
    const g = _.filter(newcourses, function(c){
      return (
        c.charAt(0) == 1 ||
        c.charAt(0) == 2
      );
    });
    courseObj.grasshopper = _.sample(g, _.random(1,5));
  }
  if (year === "Sophomore") {
    const s = _.filter(courses, function(c){
      return (
        c.charAt(0) == 1 ||
        c.charAt(0) == 2
      );
    });
    courseObj.sensei = _.sample(s, _.random(1,3));
    const newcourses = _.difference(courses, courseObj.sensei);
    const g = _.filter(newcourses, function(c){
      return (
        c.charAt(0) == 1 ||
        c.charAt(0) == 2
        );
    });
    courseObj.grasshopper = _.sample(g, _.random(1,5));
  }
  if (year === "Junior") {
    const s = _.filter(courses, function(c){
      return (
        c.charAt(0) == 1 ||
        c.charAt(0) == 2 ||
        c.charAt(0) == 3
      );
    });
    courseObj.sensei = _.sample(s, _.random(1,4));
    const newcourses = _.difference(courses, courseObj.sensei);
    const g = _.filter(newcourses, function(c){
      return (
        c.charAt(0) == 1 ||
        c.charAt(0) == 2 ||
        c.charAt(0) == 3
        );
    });
    courseObj.grasshopper = _.sample(g, _.random(1,4));
  }
  if (year === "Senior") {
    const s = _.filter(courses, function(c){
      return (
        c.charAt(0) == 1 ||
        c.charAt(0) == 2 ||
        c.charAt(0) == 3 ||
        c.charAt(0) == 4
      );
    });
    courseObj.sensei = _.sample(s, _.random(2,5));
    const newcourses = _.difference(courses, courseObj.sensei);
    const g = _.filter(newcourses, function(c){
      return (
        c.charAt(0) == 1 ||
        c.charAt(0) == 2 ||
        c.charAt(0) == 3 ||
        c.charAt(0) == 4
        );
    });
    courseObj.grasshopper = _.sample(g, _.random(1,3));
  }
  
  return courseObj;
}

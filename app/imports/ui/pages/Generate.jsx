import React from 'react';
import dayjs from 'dayjs';
import faker from 'faker';
import { _ } from 'meteor/underscore';
import DataTable from 'react-data-table-component';
import { Button, Input, Form } from 'semantic-ui-react';

import { icsCourses } from '../../api/courselist/CourseList.json'
import usercolumns from '../../api/generator/usercolumns'
import sessioncolumns from '../../api/generator/sessioncolumns'

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

/** Pluck out all of the course numbers from the master list */
const courselist = _.pluck(icsCourses, 'course');

/** 
 * Generate a list of users. Returns an array full of objects, where each object
 * is a single user. Number passed in is the number of users to generate.
 */
function generateUsers(num) {
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
 * Helper function for the session generator that generate a list of courses.
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

/** 
 * Generate a list of session. Returns an array full of objects, where each object
 * is a single session. Number passed in is the number of sesseions to generate.
 * A list of users needs to be passed in as well for the generator to work, as it
 * picks an owner from the list and then builds the list of grasshoppers and senseis
 * from the list while removing the chosen users at each pass to stop duplicates.
 * The start date is generate from the current year and month, and then a random day,
 * time, and length are picked.
 */
function generateSessions(num, userlist) {
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

    const listofusers = _.pluck(list, 'username');
    const owner = _.sample(listofusers);
    const noowner = _.difference(listofusers, owner);
    const grasshoppers = _.sample(noowner, _.random(1,5));
    const nograss = _.difference(noowner, grasshoppers);
    const senseis = _.sample(nograss, _.random(1,5));

    const sessionObj = {
      course: _.sample(courselist),
      topic: faker.lorem.sentence(5),
      description: faker.lorem.sentences(_.random(2,3)),
      start: start,
      end: end,
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

class Generate extends React.Component {
  state = { numusers: '', numsesh: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { numusers, numsesh } = this.state

    const userlist = generateUsers(numusers)
    const sessionlist = generateSessions(numsesh, userlist)

    return (
      <div style={{ marginTop: '50px' }}>
        <div style={{ width: 1700, margin: 'auto' }}>
          <div>
            <Form>
              <Form.Group>
                <Form.Input
                  placeholder='Number of users'
                  name='numusers'
                  value={numusers}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </div>
          <DataTable
            noHeader
            columns={usercolumns}
            data={userlist}
            keyField={userlist.username}
            dense
            pagination
            defaultSortField='date'
            theme='dark'
            highlightOnHover
          />
        </div>
        <br/>
        <br/>
        <div style={{ width: 1700, margin: 'auto' }}>
          <div>
            <Form>
              <Form.Group>
                <Form.Input
                  placeholder='Number of sessions'
                  name='numsesh'
                  value={numsesh}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </div>
          <DataTable
            noHeader
            columns={sessioncolumns}
            data={sessionlist}
            keyField={sessionlist.start}
            dense
            pagination
            defaultSortField='date'
            theme='dark'
            highlightOnHover
          />
        </div>
      </div>
    );
  }
}

export default Generate;

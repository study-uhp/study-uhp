import React from 'react';
import dayjs from 'dayjs';
import faker from 'faker';
import { _ } from 'meteor/underscore';
import DataTable from 'react-data-table-component';

import { icsCourses } from '../../api/courselist/CourseList.json'
import usercolumns from '../../api/generator/usercolumns'


const pDay = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30
];

const pHour = [ 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ];

const pMin = [
  30, 45, 60, 75, 90,
  30, 45, 60, 75, 90,
  30, 45, 60, 75, 90,
  105, 120,
];

const userlist = [];
const courselist = _.pluck(icsCourses, 'course');

for (let i = 0; i < 10; i++) {

  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();

  const year = _.sample(["Freshman", "Sophomore", "Junior", "Senior"])
  const major = _.sample(["Computer Science", "Computer Engineering", "Data Science", "Security Science"])

  const profileObject = {
    username: (firstname.charAt(0) + lastname + "@hawaii.edu").toLowerCase().replace(/[^a-z0-9@.]/g, ''),
    name: {
      first: firstname,
      last: lastname,
    },
    major: major,
    year: year,
    avatar: faker.image.avatar(),
    courses: getCourses(year, courselist),
    points: _.random(100,1000),
    bio: "Hi. My name is " + firstname + " and I am a " + year.toLowerCase() + " studying " + major.toLowerCase() + " at UH Manoa."
  }

  userlist.push(profileObject);
}

function getCourses(year, courses) {
  const courseObj = {};
  
  if (year === "Freshman") {
    const s = _.filter(courses, function(c){ return c.charAt(0) == 1; })
    courseObj.sensei = _.sample(s, _.random(1,2))
    const newcourses = _.difference(courses, courseObj.sensei);
    const g = _.filter(newcourses, function(c){ return c.charAt(0) == 1 || c.charAt(0) == 2; })
    courseObj.grasshopper = _.sample(g, _.random(1,5))
  }
  if (year === "Sophomore") {
    const s = _.filter(courses, function(c){ return c.charAt(0) == 1 || c.charAt(0) == 2; })
    courseObj.sensei = _.sample(s, _.random(1,3))
    const newcourses = _.difference(courses, courseObj.sensei);
    const g = _.filter(newcourses, function(c){ return c.charAt(0) == 1 || c.charAt(0) == 2; })
    courseObj.grasshopper = _.sample(g, _.random(1,5))
  }
  if (year === "Junior") {
    const s = _.filter(courses, function(c){ return c.charAt(0) == 1 || c.charAt(0) == 2 || c.charAt(0) == 3; })
    courseObj.sensei = _.sample(s, _.random(1,4))
    const newcourses = _.difference(courses, courseObj.sensei);
    const g = _.filter(newcourses, function(c){ return c.charAt(0) == 1 || c.charAt(0) == 2 || c.charAt(0) == 3; })
    courseObj.grasshopper = _.sample(g, _.random(1,4))
  }
  if (year === "Senior") {
    const s = _.filter(courses, function(c){ return c.charAt(0) == 1 || c.charAt(0) == 2 || c.charAt(0) == 3 || c.charAt(0) == 4; })
    courseObj.sensei = _.sample(s, _.random(2,5))
    const newcourses = _.difference(courses, courseObj.sensei);
    const g = _.filter(newcourses, function(c){ return c.charAt(0) == 1 || c.charAt(0) == 2 || c.charAt(0) == 3 || c.charAt(0) == 4; })
    courseObj.grasshopper = _.sample(g, _.random(1,3))
  }
  
  return courseObj;
}




const sessionlist = [];

for (let i = 0; i < 3; i++) {
  const start = dayjs('2020-05-' + _.sample(pDay) + "T" + _.sample(pHour) + ":" + _.sample([ 15, 30, 45 ]))
  const end = start.add(_.sample(pMin), 'minute')

  const listofusers = _.pluck(userlist, 'username')
  const owner = _.sample(listofusers)
  const noowner = _.difference(listofusers, owner)
  const grasshoppers = _.sample(noowner, _.random(1,5))
  const nograss = _.difference(noowner, grasshoppers)
  const senseis = _.sample(nograss, _.random(1,5))

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
  }

  sessionlist.push(sessionObj);
}


const sessioncolumns = [
  {
    name: 'COURSE',
    selector: 'course',
    sortable: true,
    width: '75px',
  },
  {
    name: 'TOPIC',
    selector: 'topic',
    sortable: true,
    wrap: true,
    width: '275px'
  },
  {
    name: 'DESCRIPTION',
    selector: 'description',
    sortable: true,
    wrap: true,
    width: '275px'
  },
  {
    name: 'DATE',
    width: '75px',
    cell: row => (
      row.start.format('MM/DD')
    ),
  },
  {
    name: 'START',
    selector: 'start',
    sortable: true,
    width: '100px',
    cell: row => (
      row.start.format('hh:mm A')
    ),
  },
  {
    name: 'END',
    selector: 'end',
    sortable: true,
    width: '100px',
    cell: row => (
      row.end.format('hh:mm A')
    ),
  },
  {
    name: 'LENGTH',
    width: '100px',
    cell: row => (
      row.end.diff(row.start, 'm') + " min"
    ),
  },
  {
    name: 'GRASSHOPPERS',
    selector: 'participants.grasshopper',
    sortable: true,
    wrap: true,
    width: '225px',
    cell: row => (
        row.participants.grasshopper.join(', ')
    ),
  },
  {
    name: 'SENSEIS',
    selector: 'participants.sensei',
    sortable: true,
    wrap: true,
    width: '225px',
    cell: row => (
      row.participants.sensei.join(', ')
  ),
  },
  {
    name: 'OWNER',
    selector: 'owner',
    sortable: true,
    width: '225px',
  },
  // {
  //   name: 'LENGTH',
  // },
];

class Generate extends React.Component {
  render() {
    return (
      <div>
        <div style={{ width: 1700, margin: 'auto' }}>
        <DataTable
          columns={usercolumns}
          data={userlist}
          keyField={userlist.username}
          dense
          pagination
          defaultSortField='date'
          theme='dark'
          highlightOnHover
        />
        {/* <div style={{ background: 'lightgray', fontSize: '11px', lineHeight: '1rem', width: 500 }}>
          <pre>
            {JSON.stringify(userlist, null, 2)}
          </pre>
        </div> */}
      </div>
      <div style={{ width: 1700, margin: 'auto' }}>
        <DataTable
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

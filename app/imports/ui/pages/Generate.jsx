import React from 'react';
import dayjs from 'dayjs';
import faker from 'faker';
import { _ } from 'meteor/underscore';
import DataTable from 'react-data-table-component';
import { Image } from 'semantic-ui-react';

import { icsCourses } from '../../api/courselist/CourseList.json'

const columns = [
  {
    name: 'AVATAR',
    selector: 'avatar',
    width: '75px',
    center: true,
    cell: row => (
      <div>
        <Image circular size="mini" src={row.avatar}/>
      </div>
    ),
  },
  {
    name: 'USERNAME',
    selector: 'username',
    sortable: true,
    grow: 2,
  },
  {
    name: 'FIRST',
    selector: 'name.first',
    sortable: true,
    grow: 1,
  },
  {
    name: 'LAST',
    selector: 'name.last',
    sortable: true,
    grow: 1,
  },
  {
    name: 'MAJOR',
    selector: 'major',
    minWidth: '175px',
  },
  {
    name: 'YEAR',
    selector: 'year',
    sortable: true,
    grow: 1,
  },
  {
    name: 'GRASSHOPPER',
    selector: 'courses.grasshopper',
    sortable: true,
    grow: 2,
    cell: row => (
        row.courses.grasshopper.join(', ')
    ),
  },
  {
    name: 'SENSEI',
    selector: 'courses.sensei',
    sortable: true,
    grow: 2,
    cell: row => (
      row.courses.sensei.join(', ')
  ),
  },
  {
    name: 'POINTS',
    selector: 'points',
    sortable: true,
    width: '75px',
  },
  {
    name: 'BIO',
    selector: 'bio',
    sortable: true,
    grow: 4,
    wrap: true,
  },

];

const pDay = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30
];

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




// const theList = [];

// for (let i = 0; i < 3; i++) {
//   const sTime = dayjs('2020-05-' + _.sample(pDay))
//   const eTime = sTime.add(_.sample(pMin), 'minute')

//   const theObj = {
//     name: _.sample(someppl),
//     time: {
//       start: sTime,
//       end: eTime,
//     }
//   }

//   theList.push(theObj);
// }

class Generate extends React.Component {
  render() {
    return (
      <div style={{ width: 1700, margin: 'auto' }}>
        <DataTable
          columns={columns}
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
    );
  }
}

export default Generate;

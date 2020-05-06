import React from 'react';
import { Image } from 'semantic-ui-react';

const usercolumns = [
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
    name: 'USER',
    selector: 'user',
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

export default usercolumns;

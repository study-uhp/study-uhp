import React from 'react';
import dayjs from 'dayjs';

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
];

export default sessioncolumns;

import React from 'react';
import { Label } from 'semantic-ui-react';

const columns = [
  {
    name: 'COURSE',
    selector: 'course',
    sortable: true,
    width: '100px',
    style: { marginTop: '3px' },
    cell: row => (
      <div>
        <Label size='small' color='black'>
          {row.course}
        </Label>
      </div>
    ),
  },
  {
    name: 'TOPIC',
    selector: 'topic',
    sortable: true,
    compact: true,
    grow: 4,
  },
  {
    name: 'DATE',
    selector: 'date',
    sortable: true,
    compact: true,
    style: { color: 'rgba(255, 255, 255, 0.5)' },
  },
  {
    name: 'START',
    selector: 'timeBegin',
    sortable: true,
    compact: true,
    style: { color: 'rgba(255, 255, 255, 0.5)' },
    // format: row => moment(row.timeBegin).format('HH:m a'),
  },
  {
    name: 'END',
    selector: 'timeEnd',
    sortable: true,
    compact: true,
    style: { color: 'rgba(255, 255, 255, 0.5)' },
  },
];

export default columns;

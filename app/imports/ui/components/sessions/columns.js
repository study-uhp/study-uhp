import React from 'react';
import dayjs from 'dayjs';
import { Label } from 'semantic-ui-react';

const columns = [
  {
    name: 'COURSE',
    selector: 'course',
    sortable: true,
    width: '100px',
    style: { marginTop: '3px' },
    // eslint-disable-next-line react/display-name
    cell: row => (
      <div>
        <Label size='small' color='black'>
          ICS {row.course}
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
    selector: 'start',
    sortable: true,
    compact: true,
    style: { color: 'rgba(255, 255, 255, 0.5)' },
    format: row => dayjs(row.start).format('MM/DD'),
  },
  {
    name: 'START',
    selector: row => dayjs(row.start).format('HH:mm').toString(),
    sortable: true,
    compact: true,
    style: { color: 'rgba(255, 255, 255, 0.5)' },
    format: row => dayjs(row.start).format('hh:mm A'),
  },
  {
    name: 'END',
    selector: row => dayjs(row.end).format('HH:mm').toString(),
    sortable: true,
    compact: true,
    style: { color: 'rgba(255, 255, 255, 0.5)' },
    format: row => dayjs(row.end).format('hh:mm A'),
  },
];

export default columns;

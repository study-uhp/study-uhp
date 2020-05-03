import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Icon, Label, Popup } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

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
  // {
  //   cell: row => (
  //     <div>
  //       <Popup
  //         inverted
  //         pinned
  //         size='tiny'
  //         position='bottom center'
  //         // offset='0, 50px'
  //         trigger={<Icon fitted link name='ellipsis horizontal'/>}
  //         content={
  //           (Meteor.user().username === row.owner ? (
  //             <Link to={`/edit/${row._id}`}>
  //               EDIT
  //             </Link>
  //           ) : (
  //             <Link to={`/join/${row._id}`}>
  //               JOIN
  //             </Link>
  //           ))
  //         }
  //         on='click'
  //       />
  //       <div>
  //         {Roles.userIsInRole(Meteor.userId(), 'admin') ? 'i am admin' : ''}
  //       </div>
  //     </div>
  //   ),
  //   width: '50px',
  //   compact: true,
  // }
];

export default columns;
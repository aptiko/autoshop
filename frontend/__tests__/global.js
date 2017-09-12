import deepFreeze from 'deep-freeze';

import C from '../src/constants';

export const testUsers = deepFreeze([
  {
    id: 1,
    username: 'alice',
    role: C.NORMAL_USER,
  }, {
    id: 2,
    username: 'bob',
    role: C.SUPERUSER,
  }, {
    id: 3,
    username: 'charlie',
    role: C.NORMAL_USER,
  },
]);

export const testRepairs = deepFreeze([
  {
    id: 8,
    assignedUser: 1,
    date: new Date('2017-04-27'),
    time: '12:50',
    complete: false,
  },
  {
    id: 5,
    assignedUser: 1,
    date: new Date('2017-05-03'),
    time: '12:30',
    complete: false,
  },
  {
    id: 11,
    assignedUser: 1,
    date: new Date('2017-05-03'),
    time: '14:00',
    complete: false,
  },
  {
    id: 13,
    assignedUser: 1,
    date: new Date('2017-05-08'),
    time: '08:00',
    complete: false,
  },
  {
    id: 21,
    assignedUser: 1,
    date: new Date('2017-07-31'),
    time: '14:00',
    complete: false,
  },
  {
    id: 22,
    assignedUser: 1,
    date: new Date('2017-07-31'),
    time: '14:01',
    complete: false,
  },
  {
    id: 23,
    assignedUser: 1,
    date: new Date('2017-07-31'),
    time: '15:00',
    complete: false,
  },
]);

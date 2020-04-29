const now = new Date();

// Everyting is 0 indexed. Which is stupid.
// YEAR, MONTH, DAY, HOURS (23), MIN (59)

export default [
  {
    id: 0,
    title: 'Today',
    start: now,
    end: now,
    desc: 'Today',
  },
  {
    id: 1,
    title: 'ICS212 Study Session',
    start: new Date(2020, 3, 7, 12, 0),
    end: new Date(2020, 3, 7, 13, 0),
    desc: 'A study session',
  },
  {
    id: 2,
    title: 'ICS211 Study Session',
    start: new Date(2020, 3, 13, 12, 0),
    end: new Date(2020, 3, 13, 15, 0),
    desc: 'A study session',
  },
  {
    id: 3,
    title: 'ICS111 Study Session',
    start: new Date(2020, 3, 6, 14, 0),
    end: new Date(2020, 3, 6, 15, 0),
    desc: 'A study session',
  },
  {
    id: 4,
    title: 'ICS314 Study Session',
    start: new Date(2020, 3, 9, 15, 0),
    end: new Date(2020, 3, 9, 16, 0),
  },
  {
    id: 5,
    title: 'ICS312 Study Session',
    start: new Date(2020, 3, 11, 9, 0),
    end: new Date(2020, 3, 11, 10, 0),
    desc: 'A study session',
  },
  {
    id: 6,
    title: 'ICS311 Study Session',
    allDay: true,
    start: new Date(2020, 3, 1, 12, 0),
    end: new Date(2020, 3, 1, 13, 0),
    desc: 'A study session',
  },
];

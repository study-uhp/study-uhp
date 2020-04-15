const now = new Date()

// Everyting is 0 indexed. Which is stupid.
// YEAR, MONTH, DAY, HOURS (23), MIN (59)

export default [
  {
    id: 0,
    title: 'ICS311',
    allDay: true,
    start: new Date(2020, 3, 0),
    end: new Date(2020, 3, 1),
  },
  {
    id: 1,
    title: 'ICS212',
    start: new Date(2020, 3, 7),
    end: new Date(2020, 3, 7),
  },

  {
    id: 2,
    title: 'ICS211',
    start: new Date(2020, 3, 13, 12, 0),
    end: new Date(2020, 3, 13, 15, 0),
  },

  {
    id: 3,
    title: 'ICS111',
    start: new Date(2020, 3, 6, 0, 0),
    end: new Date(2020, 3, 6, 0, 0),
  },

  {
    id: 4,
    title: 'ICS314',
    start: new Date(2020, 3, 9, 0, 0),
    end: new Date(2020, 3, 9, 0, 0),
  },
  {
    id: 5,
    title: 'ICS312',
    start: new Date(2020, 3, 11),
    end: new Date(2020, 3, 11),
    desc: 'A study session',
  },
  {
    id: 6,
    title: 'ICS211',
    start: new Date(2020, 3, 10, 10, 0),
    end: new Date(2020, 3, 10, 12, 0),
  },
  {
    id: 7,
    title: 'ICS311',
    start: new Date(2020, 3, 12, 12, 0),
    end: new Date(2020, 3, 12, 13, 0),
  },
  {
    id: 8,
    title: 'ICS121',
    start: new Date(2020, 3, 12, 14, 0),
    end: new Date(2020, 3, 12, 15, 0),
  },
  {
    id: 9,
    title: 'ICS401',
    start: new Date(2020, 3, 12, 17, 0),
    end: new Date(2020, 3, 12, 17, 30),
  },
  {
    id: 10,
    title: 'ICS242',
    start: new Date(2020, 3, 14, 20, 0),
    end: new Date(2020, 3, 14, 21, 0),
  },
  {
    id: 11,
    title: 'ICS141',
    start: new Date(2020, 3, 13, 7, 0),
    end: new Date(2020, 3, 13, 10, 30),
  },
  {
    id: 12,
    title: 'ICS311',
    start: new Date(2020, 3, 17, 19, 30),
    end: new Date(2020, 3, 17, 2, 0),
  },
  {
    id: 12.5,
    title: 'ICS241',
    start: new Date(2020, 3, 18, 19, 30),
    end: new Date(2020, 3, 18, 23, 30),
  },
  {
    id: 13,
    title: 'ICS112',
    start: new Date(2020, 3, 20, 19, 30),
    end: new Date(2020, 3, 20, 2, 0),
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
]

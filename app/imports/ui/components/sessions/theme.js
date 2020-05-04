import { createTheme } from 'react-data-table-component';

createTheme('sessions', {
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.5)',
    disabled: 'rgba(0,0,0,.12)',
  },
  background: {
    default: '#393D3F',
  },
  context: {
    background: '#E91E63',
    text: 'rgba(255, 255, 255, 0.87)',
  },
  divider: {
    default: '#1b1c1d',
  },
  button: {
    default: 'rgba(255, 255, 255, 0.87)',
    focus: 'rgba(0, 83, 37, .5)',
    hover: 'rgba(0, 83, 37, .5)',
    disabled: 'rgba(255, 255, 255, .18)',
  },
  sortFocus: {
    default: 'rgba(255, 255, 255, .74)',
  },
  selected: {
    default: 'rgba(0, 0, 0, .7)',
    text: 'rgba(255, 255, 255, 0.87)',
  },
  highlightOnHover: {
    default: 'rgba(96, 100, 101, .5)',
    text: 'rgba(255, 255, 255, 0.87)',
  },
  striped: {
    default: 'rgba(0, 0, 0, .87)',
    text: 'rgba(255, 255, 255, 0.87)',
  },
});

createTheme('profile', {
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.5)',
    disabled: 'rgba(0,0,0,.12)',
  },
  background: {
    default: '#1b1c1d',
  },
  context: {
    background: '#E91E63',
    text: 'rgba(255, 255, 255, 0.87)',
  },
  divider: {
    default: '#1b1c1d',
  },
  button: {
    default: 'rgba(255, 255, 255, 0.87)',
    focus: 'rgba(0, 83, 37, .5)',
    hover: 'rgba(0, 83, 37, .5)',
    disabled: 'rgba(255, 255, 255, .18)',
  },
  sortFocus: {
    default: 'rgba(255, 255, 255, .74)',
  },
  selected: {
    default: 'rgba(0, 0, 0, .7)',
    text: 'rgba(255, 255, 255, 0.87)',
  },
  highlightOnHover: {
    default: 'rgba(96, 100, 101, .15)',
    text: 'rgba(255, 255, 255, 0.87)',
  },
  striped: {
    default: 'rgba(0, 0, 0, .87)',
    text: 'rgba(255, 255, 255, 0.87)',
  },
});

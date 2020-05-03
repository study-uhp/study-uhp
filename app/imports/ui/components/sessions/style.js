const sessionsStyle = {
  headRow: {
    style: {
      backgroundColor: '#005325',
      borderBottomWidth: '0px',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
    },
    denseStyle: {
      minHeight: '32px',
    },
  },
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  rows: {
    style: {
      fontSize: '13px',
      minHeight: '48px',
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '0px',
      },
    },
    denseStyle: {
      minHeight: '36px',
    },
    highlightOnHoverStyle: {
      outlineWidth: '0px',
    },
  },
  pagination: {
    style: {
      minHeight: '32px',
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      borderTopWidth: '0px',
      backgroundColor: 'rgba(27, 28, 29, .15)',
    },
    pageButtonsStyle: {
      height: '30px',
      width: '30px',
    },
  },
};

export default sessionsStyle;

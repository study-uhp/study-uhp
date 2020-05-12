const profileStyle = {
  rows: {
    style: {
      fontSize: '12px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: '0',
      minHeight: '48px',
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '0px',
      },
    },
    denseStyle: {
      minHeight: '28px',
    },
    highlightOnHoverStyle: {
      outlineWidth: '0px',
      borderRadius: '10px',
    },
  },
  pagination: {
    style: {
      fontSize: '10px',
      minHeight: '32px',
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      borderTopWidth: '0px',
      backgroundColor: 'rgba(27, 28, 29, .15)',
    },
    pageButtonsStyle: {
      height: '24px',
      width: '24px',
      padding: '4px',
      '&:hover:not(:disabled)': {
        backgroundColor: 'transparent',
        color: 'rgba(0, 83, 37, 1)',
        fill: 'rgba(0, 83, 37, 1)',
      },
      '&:focus': {
        backgroundColor: 'transparent',
        color: 'rgba(0, 83, 37, .5)',
        fill: 'rgba(0, 83, 37, .5)',
      },
    },
  },
};

export default profileStyle;

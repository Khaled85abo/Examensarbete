import { createMuiTheme, makeStyles } from '@material-ui/core';
export const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '2.2rem',
      fontWeight: 400,
      margin: '2rem 0',
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
  },
  palette: {
    primary: {
      main: '#f0c000',
    },
    secondary: {
      main: '#208080',
    },
    error: {
      main: '#f04000',
    },
    background: {
      default: '#ffffff',
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
   toolbar: theme.mixins.toolbar,

  // toolbar: {
  //   flexWrap: 'wrap',
  // },
  toolbarTitle: {
    flexGrow: 1,
  },
  confirmationHeader: {
    margin: '15px auto',
    letterSpacing: '1,5px',
  },
  link: {
    margin: '1rem',
  },
  main: {
    padding: '1rem',
  },
  largeImage: {
    maxWidth: '50rem',
    width: '100%',
  },
  mt1: {
    marginTop: '1rem !important',
  },
  p1: {
    padding: '1rem !important',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  media: {
    height: 260,
    width: 200,
    objectFit: 'cover',
    margin: 'auto',
    marginTop: '10px',
    // paddingTop: '56.25%', // 16:9

  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

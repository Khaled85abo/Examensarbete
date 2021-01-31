import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    // marginTop: '10px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  largeImage: {
    maxHeight: '65vh',
    maxWidth: '90vw',
    margin: 'auto',
  }
 
}));
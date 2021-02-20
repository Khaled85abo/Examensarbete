import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '250px', //original width style
    minHeight: '360px',
    margin: 'auto',
    // maxWidth: '100%',
  },
  media: {
    // height: '260px',
    // maxWidth: '400px',
    objectFit: 'cover',
    margin: 'auto',
    // marginTop: '5px',
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
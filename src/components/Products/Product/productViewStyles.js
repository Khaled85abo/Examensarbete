import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    // marginTop: '10px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
  },
  largeImage: {
    maxHeight: "65vh",
    maxWidth: "80vw",
    margin: "auto",
  },
  center: {
    margin: "auto",
  },
}));

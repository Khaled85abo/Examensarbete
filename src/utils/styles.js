import { makeStyles } from "@material-ui/core";

export const useGlobalStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: theme.mixins.toolbar,
  main: {
    padding: "1rem",
  },
  largeImage: {
    maxWidth: "50rem",
    width: "100%",
  },
  link: {
    color: "black",
    "&:hover": {
      color: "green",
      textDecoration: "none",
      cursor: "pointer",
    },
  },
}));

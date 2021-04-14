import React from "react";
import { Link } from "react-router-dom";
import { useGlobalStyles } from "../utils/styles";
import { Typography } from "@material-ui/core";

export default function Footer() {
  const classes = useGlobalStyles();
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={classes.main}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Stevia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/iconpng.png";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useReactContext } from "../../contexts/ReactContext";
import { useGlobalStyles } from "../../utils/styles";
import useStyles from "./NavStyles";
const Navbar = () => {
  const globalStyles = useGlobalStyles();
  const navStyles = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [setError] = useState("");
  const { currentUser, logout, cart } = useReactContext();
  const totalItems = cart.total_items;

  const handleLogout = async () => {
    setError("");

    if (window.confirm("Vill du logga ut?")) {
      try {
        await logout();
        history.push("/");
      } catch (error) {
        setError("Faliled to log out");
      }
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        // className={navStyles.NavAppBar}
        color="inherit"
      >
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={navStyles.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="commerce.js"
              height="25px"
              className={navStyles.image}
            />
            <span className={navStyles.moto}>Healthy Life</span>
          </Typography>

          <div className={navStyles.grow} />
          <div>
            {currentUser ? (
              <div style={{ display: "flex" }}>
                <Typography
                  onClick={handleLogout}
                  style={{ marginRight: "10px" }}
                  className={globalStyles.link}
                >
                  Log Out
                </Typography>
                <Typography
                  component={Link}
                  to="/update-profile"
                  className={globalStyles.link}
                >
                  Profile
                </Typography>
              </div>
            ) : (
              <Typography component={Link} to="/login">
                Log In
              </Typography>
            )}
          </div>

          {location.pathname === "/cart" ||
          location.pathname === "/checkout" ? (
            ""
          ) : (
            <div className={navStyles.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="show cart item"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}

          {/* {location.pathname === '/' &&   (
                    <div className={classes.button}>
                         <IconButton component={Link} to='/cart' aria-label='show cart item' color='inherit' >
                             <Badge badgeContent={totalItems}  color='secondary'>
                                 <ShoppingCart />
                             </Badge>
                         </IconButton>
                     </div>
                    )} */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

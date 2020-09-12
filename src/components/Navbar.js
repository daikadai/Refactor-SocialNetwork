import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MyButton from "../util/MyButton";
import { Home } from "@material-ui/icons";
import PostScream from "./PostScream";
import Notification from "./Notification";

const Navbar = ({ authenticated }) => {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <Home />
              </MyButton>
            </Link>
            <Notification />
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);

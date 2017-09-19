import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import AssignmentIcon from "material-ui/svg-icons/action/assignment";

const Navbar = ({ loggedState, logout }) => {
  let iconElementRight =
    !loggedState.error && loggedState._id && loggedState.email
      ? <FlatButton label="logout" onClick={logout} />
      : null;

  return (
    <AppBar
      iconElementLeft={
        <IconButton>
          <AssignmentIcon />
        </IconButton>
      }
      title={<span>Djello</span>}
      iconElementRight={iconElementRight}
    />
  );
};

export default Navbar;

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HeaderContainer from "./style";

export default function Header() {
  return (
    <HeaderContainer>
      <AppBar position="fixed">
        <Toolbar>
          <img src="./assets/logo.png" alt="logo" width="70" height="70" />
          <Hidden only="xs">
            <Typography variant="h6" className="title">
              Pokèdex
            </Typography>
          </Hidden>
          <Link className="linkButton" to="/">
            <Button color="secondary" variant="outlined" className="menuButton">
              Home
            </Button>
          </Link>
          <Link className="linkButton" to="/mypokemons">
            <Button color="secondary" variant="outlined" className="menuButton">
              My Pokèmons
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </HeaderContainer>
  );
}

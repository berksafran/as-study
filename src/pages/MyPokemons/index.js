import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyPokemonList from "../../components/MyPokemonList";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#f5f5f5"
  },
  container: {
    backgroundColor: "#f5f5f5",
    marginTop: theme.spacing(5)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  }
}));

function MyPokemons() {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="flex-start" spacing={5}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">My Pokèmons</Typography>
          </Paper>
        </Grid>
        <Grid container item xs={12} justify="center" spacing={1}>
          <MyPokemonList />
        </Grid>
      </Grid>
    </>
  );
}

export default MyPokemons;

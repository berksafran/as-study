import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../../components/SearchBar";
import First100PokemonList from "../../components/First100PokemonList";
import axios from "axios";
import Loading from "../../components/Loading";
import SearchResult from "../../components/SearchResult";
import InfiniteScroll from "react-infinite-scroll-component";

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
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function HomePage() {
  const [searchResult, setSearchResult] = useState(null);
  const [first100Pokemon, setFirst100Pokemon] = useState();
  const [nextFetchUrl, setNextFetchUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  // Fetching first 100 pokemon data with details. (e.g. id)
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=12&limit=102")
      .then(response => {
        setNextFetchUrl(response.data.next);
        const pokeArray = [];
        const requests = response.data.results.map(val => {
          return axios.get(val.url).then(res => pokeArray.push(res.data));
        });

        Promise.all(requests).then(() => {
          setFirst100Pokemon(pokeArray);
          setLoading(false);
        });
      })
      .catch(e => console.log(e.message));
  }, []);

  // More fetch data
  const moreFetchData = () => {
    console.log("Yükleniyor..", nextFetchUrl);
    return axios
      .get(nextFetchUrl)
      .then(response => {
        if (response.data.next === null) {
          return console.log("The end of data.");
        }
        setNextFetchUrl(response.data.next);
        const pokeArray = [...first100Pokemon];
        const requests = response.data.results.map(val => {
          return axios.get(val.url).then(res => pokeArray.push(res.data));
        });

        Promise.all(requests).then(() => {
          setFirst100Pokemon(pokeArray);
        });
      })
      .catch(e => console.log(e.message));
  };

  const searchPokemon = result => {
    setSearchResult(result);
  };

  const ShowPokemonList = () => {
    if (searchResult) {
      switch (searchResult.status) {
        case "loading":
          return <Loading />;
        case "error":
          return (
            <Grid
              container
              xs={12}
              style={{ marginTop: 15, marginBottom: 30 }}
              justify="center"
            >
              <Typography variant="h6" gutterBottom>
                No matches found for <strong>{searchResult.pokeName}</strong>
              </Typography>
            </Grid>
          );
        case "success":
          return <SearchResult resultPoke={searchResult.result} />;
        default:
          return null;
      }
    }
    return null;
  };

  const ShowFirst100PokemonList = () => {
    if (loading) return <Loading />;
    if (first100Pokemon) {
      if (
        searchResult === null ||
        searchResult === undefined ||
        searchResult.status !== "success"
      ) {
        return (
          <InfiniteScroll
            dataLength={first100Pokemon.length}
            next={() => moreFetchData()}
            hasMore={first100Pokemon.length > 500 ? false : true}
            loader={<Loading />}
          >
            <First100PokemonList pokemonArray={first100Pokemon} />
          </InfiniteScroll>
        );
      }
    }
    return null;
  };

  return (
    <>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <SearchBar result={result => searchPokemon(result)} />
          </Paper>
        </Grid>
        <Grid container item xs={12} justify="center" spacing={1}>
          <ShowPokemonList />
        </Grid>
        <ShowFirst100PokemonList />
        <Grid container item xs={12} justify="center" spacing={1}>
          <Typography variant="button" display="block" gutterBottom>
            by Berk Safranbolulu - 2019
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;

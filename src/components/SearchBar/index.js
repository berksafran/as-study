import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SearchBarContainer from "./style";
const Pokedex = require("pokeapi-js-wrapper");

SearchBar.propTypes = {
  result: PropTypes.func.isRequired
};

function SearchBar(props) {
  const [pokeName, setPokeName] = useState("");
  const P = new Pokedex.Pokedex();

  const searchPokemon = event => {
    event.preventDefault();

    if (pokeName === "" || null || undefined) return null;

    props.result({
      status: "loading"
    });

    P.getPokemonByName(pokeName)
      .then(function(response) {
        props.result({
          status: "success",
          pokeName,
          result: response
        });
      })
      .catch(e => {
        props.result({
          status: "error",
          pokeName,
          result: e.message
        });
      });
  };

  return (
    <SearchBarContainer>
      <Paper
        component="form"
        onSubmit={searchPokemon}
        className="root"
        variant="outlined"
      >
        <img
                alt="loading"
                src={"./assets/pokeball3.gif"}
                width="70"
                className="menuButton"
              />
        <InputBase
          className="inputStyle"
          onChange={e => setPokeName(e.target.value)}
          placeholder="Search Pokèmon by name (e.g. squirtle , pikachu)"
          inputProps={{ "aria-label": "search pokemon" }}
        />
        <IconButton
          type="submit"
          onClick={searchPokemon}
          className="iconButton"
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        
      </Paper>
    </SearchBarContainer>
  );
}

export default SearchBar;

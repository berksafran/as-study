import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import First100ListContainer from "./style";
import Modal from "../Modal";

First100PokemonList.propTypes = {
  pokemonArray: PropTypes.array.isRequired
};

function First100PokemonList(props) {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState("");
  const { pokemonArray } = props;

  const handleModal = async pokemon => {
    if (!modalStatus) setSelectedPokemon(pokemon);
    setModalStatus(!modalStatus);
  };

  return (
    <>
      <First100ListContainer>
        <Grid
          container
          item
          justify="center"
          alignContent="center"
          spacing={2}
          xs={12}
          className="container"
        >
          {pokemonArray.map((pokemon, index) => (
            <Grid item xs={6} sm={3} md={2} key={index}>
              <Paper className="paper" onClick={() => handleModal(pokemon)}>
                <img
                  src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                  width={"50%"}
                  alt={pokemon.name}
                />
                <Typography variant="button" display="block" gutterBottom>
                  {pokemon.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </First100ListContainer>
      <Modal
        show={modalStatus}
        handleModal={() => handleModal()}
        selectedPokemon={selectedPokemon}
      />
    </>
  );
}

export default First100PokemonList;

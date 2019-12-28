import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import MyPokemonListContainer from "./style";
import Modal from "../Modal";
import PropTypes from "prop-types";

SearchResult.propTypes = {
  resultPoke: PropTypes.object.isRequired
};

function SearchResult(props) {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState("");
  const { resultPoke } = props;

  const handleModal = pokemon => {
    if (!modalStatus) setSelectedPokemon(pokemon);
    setModalStatus(!modalStatus);
  };

  return (
    <>
      <MyPokemonListContainer>
        <Grid
          container
          item
          justify="center"
          alignContent="center"
          spacing={0}
          xs={12}
          className="container"
        >
          <Grid item xs={12} sm={3} md={6}>
            <Paper className="paper" onClick={() => handleModal(resultPoke)}>
              <img
                src={`https://pokeres.bastionbot.org/images/pokemon/${resultPoke.id}.png`}
                width={"50%"}
                alt={resultPoke.name}
              />
              <Typography variant="button" display="block" gutterBottom>
                {resultPoke.name}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </MyPokemonListContainer>
      <Modal
        show={modalStatus}
        handleModal={() => handleModal()}
        selectedPokemon={selectedPokemon}
      />
    </>
  );
}

export default SearchResult;

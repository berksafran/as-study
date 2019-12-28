import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import MyPokemonListContainer from "./style";
import Modal from "../Modal";
import axios from "axios";
import Loading from "../Loading";
import _ from "lodash";

function MyPokemonList() {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [myPokemonArray, setMyPokemonArray] = React.useState();

  // Fetching my pokemon list from LocalStorage
  React.useEffect(() => {
    setLoading(true);
    const myPokemonList = JSON.parse(localStorage.getItem("myPokemonList"));
    const pokeArray = [];

    // Fetching detailed data
    const requests = myPokemonList.map((val, index) => {
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${val.id}`)
        .then(response => (pokeArray[index] = { ...response.data }));
    });
    Promise.all(requests)
      .then(() => {
        setMyPokemonArray(pokeArray);
        setLoading(false);
      })
      .catch(e => console.log("Fetch error", e.message));
  }, [modalStatus]);

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
          spacing={_.size(myPokemonArray) === 0 ? 0 : 2}
          xs={12}
          className="container"
        >
          {loading ? (
            <Loading />
          ) : _.size(myPokemonArray) > 0 ? (
            myPokemonArray.map((pokemon, index) => (
              <Grid
                item
                xs={6}
                sm={3}
                md={_.size(myPokemonArray) === 1 ? 4 : 2}
                key={index}
              >
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
            ))
          ) : (
                <Typography variant="button" display="block" gutterBottom>
                  There is no Pokèmon to show here. Please add some Pokèmon in your list.
                </Typography>
          )}
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

export default MyPokemonList;

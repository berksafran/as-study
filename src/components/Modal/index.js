import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddBox";
import BackspaceIcon from "@material-ui/icons/Backspace";
import _ from "lodash";
import "./style.css";
import PropTypes from "prop-types";

Modal.propTypes = {
  selectedPokemon: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  show: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired
};

export default function Modal(props) {
  const { selectedPokemon, show, handleModal } = props;
  const [isThisExisting, setIsThisExisting] = React.useState();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  // Check this pokemon existing in My Pokemon list
  const checkObject = () => {
    // Get My Pokemon List
    const myPokemonList = JSON.parse(localStorage.getItem("myPokemonList"));
    const checkStatus = _.filter(
      myPokemonList,
      o => o.id === selectedPokemon.id
    );
    return checkStatus.length > 0
      ? setIsThisExisting(true)
      : setIsThisExisting(false);
  };

  React.useEffect(() => {
    checkObject();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[show]);

  const addToMyPokemonList = () => {
    checkObject();
    // If not existing, add new pokemon to My Pokemon list
    const myPokemonList = JSON.parse(localStorage.getItem("myPokemonList"));
    if (!isThisExisting) {
      const newMyPokemonList = _.isArray(myPokemonList)
        ? [
            ...myPokemonList,
            {
              id: selectedPokemon.id,
              name: selectedPokemon.name,
              url: selectedPokemon.url
            }
          ]
        : [
            {
              id: selectedPokemon.id,
              name: selectedPokemon.name,
              url: selectedPokemon.url
            }
          ];
      localStorage.setItem("myPokemonList", JSON.stringify(newMyPokemonList));
      setIsThisExisting(true);
      handleModal();
      handleSnackbar(`Added ${selectedPokemon.name}`)
    }
  };
  
  const removeFromMyPokemonList = () => {
    checkObject();
    // Check existing, If yes, remove it.
    if (isThisExisting) {
      const myPokemonList = JSON.parse(localStorage.getItem("myPokemonList"));
      const newMyPokemonList = _.filter(
        myPokemonList,
        o => o.id !== selectedPokemon.id
        );
        localStorage.setItem("myPokemonList", JSON.stringify(newMyPokemonList));
        setIsThisExisting(false);
        handleModal();
        handleSnackbar(`Removed ${selectedPokemon.name}`)
    }
  };

  const handleSnackbar = (message) => {
    setSnackbar({
      status: !snackbar.status,
      message: message
    })
  };

  return (
    <>
    <Dialog
      open={show}
      onClose={handleModal}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="modalHeader">
        <DialogTitle id="responsive-dialog-title" className="modalTitle">
          {selectedPokemon.name}
        </DialogTitle>
        {/* Add - Remove Button */}
        <div className={isThisExisting ? "removeButton" : "addButton"}>
          {isThisExisting ? (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<BackspaceIcon />}
              onClick={removeFromMyPokemonList}
            >
              Remove from List
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={addToMyPokemonList}
            >
              Add to list
            </Button>
          )}
        </div>
      </div>
      <DialogContent>
        <div>
          <center>
            <img
              src={`https://pokeres.bastionbot.org/images/pokemon/${selectedPokemon.id}.png`}
              width="40%"
              alt={selectedPokemon.name}
              className="pokeImage"
            />
          </center>
        </div>
        {/* Poke Sprites */}
        <div className="pokeContent">
          <div className="pokeEvolve">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
              alt="poke"
            />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${selectedPokemon.id}.png`}
              alt="poke"
            />
          </div>
        </div>
        {/* Poke Weight */}
        <div className="pokeContent">
          <div className="pokeTable">
            <div className="pokeTableTitle">Weight</div>
            <div className="pokeTableData">
              {selectedPokemon.weight / 10} kg
            </div>
          </div>
        </div>
        {/* Poke Height */}
        <div className="pokeContent">
          <div className="pokeTable">
            <div className="pokeTableTitle">Height</div>
            <div className="pokeTableData">{selectedPokemon.height / 10} m</div>
          </div>
        </div>
        {/* Poke Types */}
        <div className="pokeContent">
          <div className="pokeTable">
            <div className="pokeTableTitle">Type(s)</div>
            <div className="pokeTableData">
              <ul>
                {_.map(selectedPokemon.types, (o, index) => (
                  <li key={index}>{o.type.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Poke Abilities */}
        <div className="pokeContent">
          <div className="pokeTable">
            <div className="pokeTableTitle">Abilities</div>
            <div className="pokeTableData">
              <ul>
                {_.map(selectedPokemon.abilities, (o, index) => (
                  <li key={index}>{o.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Poke Moves */}
        <div className="pokeContent">
          <div className="pokeTable">
            <div className="pokeTableTitle">Moves</div>
            <div className="pokeTableData">
              <ul>
                {_.map(selectedPokemon.moves, (o, index) => (
                  <li key={index}>{o.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={snackbar.status}
        onClose={() => handleSnackbar('')}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        autoHideDuration={2000}
        message={snackbar.message}
      />
    </>
  );
}

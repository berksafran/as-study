import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import MyPokemons from "./pages/MyPokemons";

function App() {
  return (
    <>
      <Router>
        <Header />
        <AppContainer>
          <Switch>
            <Route path="/" exact component={() => <HomePage />} />
            <Route
              path="/mypokemons"
              exact
              component={() => <MyPokemons />}
            />
            <Route
              component={() => <p>Error. Sayfa bulunamadı. Burayı düzenle!</p>}
            />
          </Switch>
        </AppContainer>
      </Router>
    </>
  );
}

export default App;

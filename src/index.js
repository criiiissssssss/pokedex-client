import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import Pokemon from "./components/Pokemons/Pokemons.js";

import Header from "./components/Header/Header.js";

import "./index.css";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={Pokemon} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

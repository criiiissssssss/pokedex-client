import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./index.css";

import "./index.css";
// import Pokemon from "./App";
import Pokemon from "./components/Pokemons/Pokemons.js";
import * as serviceWorker from "./serviceWorker";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <React.Fragment>
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

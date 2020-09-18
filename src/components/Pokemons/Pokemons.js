import React from "react";
import axios from "axios";

import Pokemon from "../Pokemon/Pokemon.js";
import Loading from "../Loading/Loading.js";
import Modal from "../Modal/Modal.js";

import styles from "./styles.module.css";

export default class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Pokemons: [],
      count: 0,

      List: {},
      isLoading: true,
      isOpen: false,
      currentPokemon: { name: null, data: null, url: null },
    };
  }

  componentDidMount() {
    this.handleApiCall("pokemon?limit=20&offset=0", this.state.count);
  }
  handleApiCall = (link, count) => {
    this.setState({ isLoading: true });
    axios
      .get("https://pokeapi.co/api/v2/" + link)
      .then((data) => {
        console.log("api data", data.data.results);
        let Pokemons = this.state.Pokemons;
        let newPokemons = data.data.results;

        newPokemons.map((newPokemon, index) => {
          newPokemon.Id = index + count + 1;
          Pokemons.push(newPokemon);
        });

        this.handleList(Pokemons);
      })

      .catch((error) =>
        this.setState({
          isLoading: false,
          title: "Opps",
          message: "soorry an ereror occured. please reload the page",
        })
      );
  };
  handleList = (Pokemons) => {
    console.log("handle", Pokemons);

    let row = [];
    var i,
      temparray,
      j,
      chunk = 3;

    for (i = 0, j = Pokemons.length; i < j; i += chunk) {
      temparray = Pokemons.slice(i, i + chunk);
      row.push(temparray);
    }

    this.setState({
      List: row,
      Pokemons: Pokemons,
      isLoading: false,
    });
  };
  add = () => {
    let length = this.state.count + 20;

    let link = `pokemon?limit=20&offset=${length}`;
    this.setState({ count: length }, () =>
      this.handleApiCall(link, this.state.count)
    );
  };

  OpenModal = (pokemon) => {
    this.setState({ isLoading: true });
    axios
      .get(pokemon.url)
      .then((data) => {
        this.setState(
          {
            currentPokemon: {
              name: pokemon.name,
              url: pokemon.url,
              data: data.data,
            },
          },
          () => this.setState({ isLoading: false, isOpen: true })
        );

        console.log("pokemon data", this.state.currentPokemon.data);
      })
      .catch((error) =>
        this.setState({
          isLoading: false,
          title: "Opps",
          message: "soorry an ereror occured. please reload the page",
        })
      );
  };
  CloseModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { Pokemons, isLoading, List, isOpen, currentPokemon } = this.state;
    console.log("render", this.state);

    return (
      <div className={styles.container}>
        {isLoading ? <Loading /> : null}
        {List
          ? Object.keys(List).map((row) => {
              // this.getImage()
              return (
                <div key={row} className={styles.row}>
                  {List[row].map((pokemon) => {
                    return (
                      <Pokemon
                        key={pokemon.name}
                        pokemon={pokemon}
                        // image={bulbasour}
                        image={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.Id}.png`}
                        openModal={this.OpenModal}
                      />
                    );
                  })}
                </div>
              );
            })
          : null}
        {isOpen ? (
          <Modal pokemon={currentPokemon} closeModal={this.CloseModal} />
        ) : null}

        <div className={styles.addContainer}>
          <div className={styles.addMore} onClick={() => this.add()}>
            +
          </div>
        </div>
      </div>
    );
  }
}

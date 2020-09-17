import React from "react";
import axios from "axios";

import Pokemon from "../Pokemon/Pokemon.js";
import Loading from "../Loading/Loading.js";
import Modal from "../Modal/Modal.js";

import styles from "./styles.module.css";

import bulbasour from "../images/Bulbasaur.png";

export default class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Pokemons: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
        { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
        { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
        { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
        { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
        { name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
        { name: "caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" },
        { name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" },
        { name: "butterfree", url: "https://pokeapi.co/api/v2/pokemon/12/" },
        { name: "weedle", url: "https://pokeapi.co/api/v2/pokemon/13/" },
        { name: "kakuna", url: "https://pokeapi.co/api/v2/pokemon/14/" },
        { name: "beedrill", url: "https://pokeapi.co/api/v2/pokemon/15/" },
        { name: "pidgey", url: "https://pokeapi.co/api/v2/pokemon/16/" },
        { name: "pidgeotto", url: "https://pokeapi.co/api/v2/pokemon/17/" },
        { name: "pidgeot", url: "https://pokeapi.co/api/v2/pokemon/18/" },
        { name: "rattata", url: "https://pokeapi.co/api/v2/pokemon/19/" },
        { name: "raticate", url: "https://pokeapi.co/api/v2/pokemon/20/" },
      ],
      isLoading: true,
      isOpen: false,
      currentPokemon: { name: null, data: null, url: null },
    };
  }

  componentDidMount() {
    let row = [];
    const { Pokemons } = this.state;
    var i,
      j,
      temparray,
      chunk = 3;
    for (i = 0, j = Pokemons.length; i < j; i += chunk) {
      temparray = Pokemons.slice(i, i + chunk);

      row.push(temparray);

      // do whatever
    }
    this.setState({ List: { ...row }, isLoading: false });

    // axios
    //   .get("https://pokeapi.co/api/v2/pokemon")
    //   .then((data) =>
    //     this.setState({ Pokemons: data.data.results, isLoading: false }, () =>
    //       console.log("Did Mount", this.state.Pokemons)
    //     )
    //   )
    //   .catch((error) =>
    //     this.setState({
    //       isLoading: false,
    //       title: "Opps",
    //       message: "soorry an ereror occured. please reload the page",
    //     })
    //   );
  }
  handleApiCall = (pokemon) => {
    axios
      .get(pokemon.url)
      .then(
        (data) =>
          this.setState({
            currentPokemon: {
              name: pokemon.name,
              url: pokemon.url,
              data: data.data,
            },
          }),
        () => console.log(this.state.currentPokemon)
      )
      .catch((error) =>
        this.setState({
          isLoading: false,
          title: "Opps",
          message: "soorry an ereror occured. please reload the page",
        })
      );
  };
  OpenModal = (pokemon) => {
    this.setState({ isLoading: true });
    axios
      .get(pokemon.url)
      .then((data) => {
        {
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
        }
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
    return (
      <div className={styles.container}>
        {isLoading ? <Loading /> : null}
        {List
          ? Object.keys(List).map((row) => (
              <div key={row} className={styles.row}>
                {List[row].map((pokemon) => (
                  <Pokemon
                    key={pokemon.name}
                    pokemon={pokemon}
                    image={bulbasour}
                    openModal={this.OpenModal}
                  />
                ))}
              </div>
            ))
          : null}
        {isOpen ? (
          <Modal pokemon={currentPokemon} closeModal={this.CloseModal} />
        ) : null}
      </div>
    );
  }
}

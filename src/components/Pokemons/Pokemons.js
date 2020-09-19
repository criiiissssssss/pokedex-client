import React from "react";
import axios from "axios";

import Pokemon from "../Pokemon/Pokemon.js";
import Loading from "../Loading/Loading.js";
import Modal from "../Modal/Modal.js";
import ErrorAlert from "../ErrorAlert/ErrorAlert.js";

import styles from "./styles.module.css";

export default class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Pokemons: [],
      count: 0,
      List: {},
      error: false,
      isLoading: true,
      isOpen: false,
      searchValue: "",
      searchPokemon: {},
      currentPokemon: { name: null, data: null, url: null, image: null },
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
  closeAlert = () => {
    this.setState({ error: false });
  };

  searchPokemon = () => {
    console.log("search");
    this.setState({ isLoading: true });
    if (this.state.searchValue !== "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + this.state.searchValue)
        .then((data) => {
          console.log("pokemon data", data.data);
          this.setState(
            {
              currentPokemon: {
                name: data.data.name,
                url: "https://pokeapi.co/api/v2/pokemon/" + data.data.id,
                Id: data.data.id,
                image: `https://pokeres.bastionbot.org/images/pokemon/${data.data.id}.png`,
                data: data.data,
              },
            },
            () => this.setState({ isLoading: false, isOpen: true })
          );
        })
        .catch((error) =>
          this.setState({
            error: true,
            isLoading: false,
            title: "Opps!..",
            message:
              "coudnt find the Pokemon you were looking for. make sure you spell it correctly.",
          })
        );
    } else {
      this.setState({
        error: true,
        isLoading: false,
        title: "OOPS!!...",
        message: "you must add a Pokemon to search it!",
      });
    }
  };
  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleList = (Pokemons) => {
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

  OpenModal = (pokemon, image) => {
    this.setState({ isLoading: true });
    axios
      .get(pokemon.url)
      .then((data) => {
        this.setState(
          {
            currentPokemon: {
              name: pokemon.name,
              url: pokemon.url,
              Id: pokemon.Id,
              image: image,
              data: data.data,
            },
          },
          () => this.setState({ isLoading: false, isOpen: true })
        );

        console.log("pokemon data", this.state.currentPokemon);
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
    const {
      Pokemons,
      isLoading,
      List,
      isOpen,
      currentPokemon,
      error,
    } = this.state;
    console.log("render", this.state);

    return (
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="input"
            name="searchValue"
            value={this.state.searchValue}
            onChange={(e) => this.handleChange(e)}
          ></input>
          <span
            className={styles.searchtitle}
            onClick={() => this.searchPokemon()}
          >
            Search Pokemon:
          </span>
        </div>
        {error ? (
          <ErrorAlert
            title={this.state.title}
            message={this.state.message}
            closeAlert={this.closeAlert}
          />
        ) : null}
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

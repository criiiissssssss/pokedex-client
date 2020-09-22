import React from "react";

import pokemonLogo from "../../images/pokemonLogo.png";
import pokeball from "../../images/pokeball.png";
import styles from "./styles.module.css";

const Header = (props) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={pokemonLogo} alt="" />

      <div className={styles.Title}>Pokedex</div>
    </div>
  );
};

export default Header;

// <div>
// <img className={styles.pokebalImg} src={pokeball} alt="" />
// </div>

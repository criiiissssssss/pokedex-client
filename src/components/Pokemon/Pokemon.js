import React from "react";

import styles from "./styles.module.css";

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pokemon, image, openModal } = this.props;
    return (
      <div
        className={styles.container}
        onClick={() => openModal(pokemon, image)}
      >
        <div className={styles.imageContainer}>
          <img alt="" className={styles.image} src={image ? image : null} />
        </div>
        <div className={styles.title}>{pokemon.name}</div>
      </div>
    );
  }
}

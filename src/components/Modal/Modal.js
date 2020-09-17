import React from "react";

import styles from "./styles.module.css";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { closeModal, pokemon } = this.props;
    return (
      <div className={styles.Modal}>
        <div className={styles.Container}>
          <div className={styles.title}>
            <span>{pokemon.name}</span>
            <button onClick={() => closeModal()}>Close</button>
          </div>
          <div className={styles.content}></div>
        </div>
      </div>
    );
  }
}

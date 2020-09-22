import React from "react";

import styles from "./styles.module.css";

const feilds = (props) => {
  return (
    <div
      className={`${styles.container} ${styles.flex} ${
        !props.label ? styles.moves : null
      }`}
    >
      {props.label ? (
        <div
          className={`${styles.label} ${
            props.className ? props.className : null
          }`}
        >
          {props.label + ":"}
        </div>
      ) : null}
      <div className={styles.content}>{props.ability}</div>
    </div>
  );
};

export default feilds;

import React from "react";

import styles from "./styles.module.css";

const Error = (props) => {
  const { title, message, closeAlert } = props;
  return (
    <div className={styles.Modal} onClick={() => closeAlert()}>
      <div className={styles.Container} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => closeAlert()} className={styles.close}>
          x
        </button>
        <div className={styles.title}>{title}</div>

        <div className={styles.message}>{message}</div>
      </div>
    </div>
  );
};

export default Error;

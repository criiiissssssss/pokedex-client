import React from "react";

import Load from "../../icons/Loading.svg";

import styles from "./styles.module.css";

const Loading = (props) => {
  return (
    <div className={`${styles.Loading} ${props.className}`}>
      <img className={styles.LoadingIcon} src={Load} alt="" />
    </div>
  );
};

export default Loading;

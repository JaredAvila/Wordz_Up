import React from "react";

import * as styles from "./NotFound.module.css";

const NotFound = props => {
  return (
    <div className={styles.NotFound}>
    <h1>Unable to find "{props.word.spelling}".</h1>
    <p>Did you mean...</p>
    <ul>
      {props.suggestions.map(el => {
        return <li key={el}>{el}</li>;
      })}
    </ul>
  </div>
  );
};

export default NotFound;

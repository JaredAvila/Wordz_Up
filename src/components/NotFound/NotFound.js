import React from "react";

import * as styles from "./NotFound.module.css";

import URLLink from "../URLLink/URLLink";

const NotFound = props => {
  return (
    <div className={styles.NotFound}>
      <h1 className={styles.Title}>Unable to find "{props.word.spelling}".</h1>
      <p className={styles.Alt}>Did you mean...</p>
      <ul className={styles.List}>
        {props.suggestions.map(el => {
          return (
            <li className={styles.Item} key={el}>
              <URLLink url={`/${el}`}>{el}</URLLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotFound;
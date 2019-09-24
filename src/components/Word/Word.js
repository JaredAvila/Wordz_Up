import React from "react";

import * as styles from "./Word.module.css";

const Word = props => {
  return (
    <div className={styles.Word}>
      <h1 className={styles.Title}>
        <span>{props.word.spelling}</span> ({props.word.type}):
      </h1>
      <ul className={styles.List}>
        {props.word.definition.map((def, i) => {
          return (
            <li className={styles.Item} key={i}>
              {i + 1}) {def}
            </li>
          );
        })}
      </ul>
      <div className={styles.Sound}>
        <audio controls>
          <source src={props.word.soundURL} type="audio/wav" />
          your browser doesn't support this audio type
        </audio>
        <p className={styles.Pronounce}>
          (<em>{props.word.pronounce}</em>)
        </p>
      </div>
    </div>
  );
};

export default Word;

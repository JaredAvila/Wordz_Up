import React from "react";

import * as styles from "./Word.module.css";

const Word = props => {
  return (
    <div className={styles.Word}>
      <h1>
        {props.word.spelling} ({props.word.type}):
      </h1>
      <p>({props.word.pronounce})</p>
      <ul>
        {props.word.definition.map((def, i) => {
          return (
            <li key={i}>
              {i + 1}) {def}
            </li>
          );
        })}
      </ul>
      <audio controls>
        <source src={props.word.soundURL} type="audio/wav" />
        your browser doesn't support this audio type
      </audio>
    </div>
  );
};

export default Word;

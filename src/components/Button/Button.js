import React from "react";
import { Link } from "react-router-dom";

import * as styles from "./Button.module.css";

const Button = props => {
  return (
    <Link className={styles.Button} to={props.url}>
      {props.children}
    </Link>
  );
};

export default Button;

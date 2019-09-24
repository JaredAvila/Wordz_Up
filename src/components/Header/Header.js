import React from "react";
import * as styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";

export default function Header() {
  return (
    <div className={styles.Header}>
      <h1 className={styles.Title}>
        Wordz
        <FontAwesomeIcon icon={faArrowAltCircleUp} className={styles.Icon} />
      </h1>
      <p className={styles.Subline}>A place to look Wordz-Up</p>
    </div>
  );
}

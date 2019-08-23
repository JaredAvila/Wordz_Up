import React from "react";
import * as styles from "./Home.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.Headline}>
        <h1 className={styles.Title}>
          Wordz
          <FontAwesomeIcon icon={faArrowAltCircleUp} className={styles.Icon} />
        </h1>
        <p className={styles.Subline}>Where we go to look Wordz-Up</p>
      </div>
    </div>
  );
};

export default Home;

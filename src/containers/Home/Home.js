import React from "react";
import * as styles from "./Home.module.css";

import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";

const Home = () => {
  return (
    <div className={styles.Home}>
      <Header />
      <Search />
    </div>
  );
};

export default Home;

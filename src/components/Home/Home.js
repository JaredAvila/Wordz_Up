import React, { Component } from "react";
import * as styles from "./Home.module.css";

import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  state = {
    redirect: false
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("it works!");
    this.setState({ redirect: true });
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/word" />;
    }
    return (
      <div className={styles.Home}>
        <div className={styles.Headline}>
          <h1 className={styles.Title}>
            Wordz
            <FontAwesomeIcon
              icon={faArrowAltCircleUp}
              className={styles.Icon}
            />
          </h1>
          <p className={styles.Subline}>Where we go to look Wordz-Up</p>
        </div>
        <div className={styles.Search}>
          <p className={styles.Info}>Search a word to find the definition</p>
          <form className={styles.Form} onSubmit={this.handleSubmit}>
            <input className={styles.Input} type="text" />
            <button className={styles.Button} type="submit">
              <FontAwesomeIcon className={styles.FormIcon} icon={faSearch} />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;

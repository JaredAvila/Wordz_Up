import React, { Component } from "react";
import { Redirect } from "react-router";

import * as styles from "./Search.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class Search extends Component {
  state = {
    redirect: false,
    word: "",
    error: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const el = document.getElementById("Input");
    if (!el.value.length) {
      this.setState({ error: "Must enter a word" });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 1500);
    } else {
      this.setState({ redirect: true, word: `/${el.value}` });
    }
  };
  render() {
    const { redirect, error } = this.state;
    if (redirect) {
      return <Redirect to={this.state.word} />;
    }
    return (
      <div className={styles.Search}>
        <p className={styles.Info}>Search a word to find the definition</p>
        <form className={styles.Form} onSubmit={this.handleSubmit}>
          <input id="Input" className={styles.Input} type="text" />
          <button className={styles.Button} type="submit">
            <FontAwesomeIcon className={styles.FormIcon} icon={faSearch} />
          </button>
        </form>
        <p className={styles.Error}>{error}</p>
      </div>
    );
  }
}

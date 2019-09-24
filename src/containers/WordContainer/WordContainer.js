import React, { Component } from "react";
import axios from "axios";

import * as styles from "./WordContainer.module.css";

import Word from "../../components/Word/Word";
import NotFound from "../../components/NotFound/NotFound";
import Button from "../../components/Button/Button";

// https://www.dictionaryapi.com/api/v3/references/collegiate/json/cheese?key=your-api-key  DICTIONARY EX
// https://media.merriam-webster.com/soundc11/[subdirectory]/[base filename].wav  PRONOUNCIATION EX
// https://www.dictionaryapi.com/api/v3/references/thesaurus/json/umpire?key=your-api-key  THESAURUS EX

class WordContainer extends Component {
  state = {
    word: {
      spelling: null,
      type: null,
      pronounce: null,
      definition: [],
      soundURL: null
    },
    suggestions: [],
    notFound: false
  };

  componentDidMount() {
    this.getWordData(this.props.match.params.word);
  }

  getWordData = word => {
    const DICTIONARY_KEY = process.env.REACT_APP_DICTIONARY_API_KEY;
    // const THESAURUS_KEY = process.env.REACT_APP_THESAURUS_API_KEY;
    // get info from API
    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${DICTIONARY_KEY}`
      )
      .then(data => {
        // check for validity of returned data
        // if it is an array and not an object then the word was not found
        if (typeof data.data[0] !== "object") {
          // if the array is empty no suggestions were found
          const unfoundWord = {
            spelling: this.props.match.params.word
          };
          if (data.data.length < 1) {
            this.setState({
              suggestions: ["No suggestions. Please try again"],
              word: unfoundWord,
              notFound: true
            });
          } else {
            this.setState({
              word: unfoundWord,
              suggestions: data.data,
              notFound: true
            });
          }
        } else {
          let soundCategory = data.data[0].meta.id[0];
          const soundName = data.data[0].hwi.prs[0].sound.audio;
          // If first char in word is not a letter set result to false.
          const patt = /^[A-Za-z]+$/;
          let result = patt.test(data.data[0].hwi.hw[0]);
          // Checks for 'gg' at the beginning of sound file
          if (soundName[0] === "g" && soundName[1] === "g") {
            soundCategory = "gg";
            // Checks for "bix" at the beginning of sound file
          } else if (
            soundName[0] === "b" &&
            soundName[1] === "i" &&
            soundName[2] === "x"
          ) {
            soundCategory = "bix";
            // Checks to see if the first char is not a letter
          } else if (!result) {
            soundCategory = "number";
            result = true;
          }
          // set all the word data in state
          const newWord = {
            spelling: word,
            type: data.data[0].fl,
            pronounce: data.data[0].hwi.prs[0].mw,
            definition: data.data[0].shortdef,
            soundURL: `https://media.merriam-webster.com/soundc11/${soundCategory}/${data.data[0].hwi.prs[0].sound.audio}.wav`
          };
          this.setState({
            word: newWord,
            notFound: false
          });
        }
      })
      .catch(err => {
        const unfoundWord = {
          spelling: this.props.match.params.word
        };
        this.setState({
          suggestions: ["No suggestions. Please try again"],
          word: unfoundWord,
          notFound: true
        });
      });
  };

  handleUpdate = newWord => {
    this.getWordData(newWord);
  };

  render() {
    let markUp;
    if (this.state.word.spelling) {
      // if the word was not found, use this markup isntead
      if (this.state.notFound) {
        markUp = (
          <NotFound
            suggestions={this.state.suggestions}
            word={this.state.word}
            updateWord={this.handleUpdate}
          />
        );
      } else {
        markUp = <Word word={this.state.word}></Word>;
      }
    }

    return (
      <div className={styles.container}>
        {markUp}
        <Button url="/">Back</Button>
      </div>
    );
  }
}

export default WordContainer;

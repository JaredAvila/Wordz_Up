import React, { Component, Fragment } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

// https://www.dictionaryapi.com/api/v3/references/collegiate/json/cheese?key=your-api-key  DICTIONARY EX
// https://media.merriam-webster.com/soundc11/[subdirectory]/[base filename].wav  PRONOUNCIATION EX
// https://www.dictionaryapi.com/api/v3/references/thesaurus/json/umpire?key=your-api-key  THESAURUS EX

class Word extends Component {
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
    const DICTIONARY_KEY = process.env.REACT_APP_DICTIONARY_API_KEY;
    const THESAURUS_KEY = process.env.REACT_APP_THESAURUS_API_KEY;
    // get info from API
    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${
          this.props.match.params.word
        }?key=${DICTIONARY_KEY}`
      )
      .then(data => {
        // check for validity of returned data
        // if it is an array and not an object then the word was not found
        if (typeof data.data[0] !== "object") {
          // if the array is empty no suggestions were found
          if (data.data.length < 1) {
            this.setState({
              suggestions: ["No suggestions. Please try again"],
              notFound: true
            });
          } else {
            this.setState({
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
            spelling: this.props.match.params.word,
            type: data.data[0].fl,
            pronounce: data.data[0].hwi.prs[0].mw,
            definition: data.data[0].shortdef,
            soundURL: `https://media.merriam-webster.com/soundc11/${soundCategory}/${
              data.data[0].hwi.prs[0].sound.audio
            }.wav`
          };
          this.setState({
            word: newWord
          });
        }
        console.log("What I want ", data.data[0].hwi.hw);
        console.log(this.state.word);
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {}

  render() {
    let audio = "";
    // Waits for audioURL in state before rendering element
    if (this.state.word.soundURL) {
      audio = (
        <audio controls>
          <source src={this.state.word.soundURL} type="audio/wav" />
          your browser doesn't support this audio type
        </audio>
      );
    }
    let markUp = (
      <Fragment>
        <h1>
          {this.state.word.spelling} Component ({this.state.word.type})
        </h1>
        {audio}
        <Link to="/">Back</Link>
      </Fragment>
    );
    // if the word was not found, use this markup isntead
    if (this.state.notFound) {
      markUp = (
        <Fragment>
          <h1>Word Not Found.</h1>
          <p>Did you mean...</p>
          <ul>
            {this.state.suggestions.map(el => {
              return <li key={el}>{el}</li>;
            })}
          </ul>
          <Link to="/">Back</Link>
        </Fragment>
      );
    }
    return <div>{markUp}</div>;
  }
}

export default Word;

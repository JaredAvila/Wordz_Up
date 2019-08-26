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
      sound: null,
      definition: [],
      soundCat: null
    },
    suggestions: [],
    notFound: false
  };

  componentDidMount() {
    const DICTIONARY_KEY = process.env.REACT_APP_DICTIONARY_API_KEY;
    const THESAURUS_KEY = process.env.REACT_APP_THESAURUS_API_KEY;
    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${
          this.props.match.params.word
        }?key=${DICTIONARY_KEY}`
      )
      .then(data => {
        if (typeof data.data[0] !== "object") {
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
          let soundName = data.data[0].hwi.prs[0].sound.audio;
          let patt = /^[A-Za-z]+$/;
          let result = patt.test(data.data[0].hwi.hw[0]);
          if (soundName[0] === "g" && soundName[1] === "g") {
            soundCategory = "gg";
          } else if (
            soundName[0] === "b" &&
            soundName[1] === "i" &&
            soundName[2] === "x"
          ) {
            soundCategory = "bix";
          } else if (!result) {
            soundCategory = "number";
            result = true;
          }
          const newWord = {
            spelling: data.data[0].hwi.hw,
            type: data.data[0].fl,
            pronounce: data.data[0].hwi.prs[0].mw,
            sound: data.data[0].hwi.prs[0].sound.audio,
            definition: data.data[0].shortdef,
            soundCat: soundCategory
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

  render() {
    let markUp = (
      <Fragment>
        <h1>
          {this.state.word.spelling} Component ({this.state.word.type})
        </h1>
        <Link to="/">Back</Link>
      </Fragment>
    );

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

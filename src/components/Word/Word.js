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
      sound: null
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
          console.log("not a word");
          this.setState({
            suggestions: data.data,
            notFound: true
          });
        } else {
          const newWord = {
            spelling: this.props.match.params.word,
            type: data.data[0].fl,
            pronounce: data.data[0].hwi.prs[0].mw,
            sound: data.data[0].hwi.prs[0].sound.audio
          };
          this.setState({
            word: newWord
          });
        }
        console.log("What I want ", data.data);
        console.log(data.data[0]);
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
              return <li>{el}</li>;
            })}
          </ul>
        </Fragment>
      );
    }
    return <div>{markUp}</div>;
  }
}

export default Word;

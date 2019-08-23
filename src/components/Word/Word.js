import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

// https://www.dictionaryapi.com/api/v3/references/collegiate/json/cheese?key=your-api-key  DICTIONARY EX
// https://media.merriam-webster.com/soundc11/[subdirectory]/[base filename].wav  PRONOUNCIATION EX
// https://www.dictionaryapi.com/api/v3/references/thesaurus/json/umpire?key=your-api-key  THESAURUS EX

class Word extends Component {
  state = {
    word: null
  };

  componentDidMount() {
    const DICTIONARY_KEY = process.env.REACT_APP_DICTIONARY_API_KEY;
    const THESAURUS_KEY = process.env.REACT_APP_THESAURUS_API_KEY;
    const { word } = this.props.match.params;
    this.setState({ word: word });
    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${
          this.props.match.params.word
        }?key=${DICTIONARY_KEY}`
      )
      .then(data => console.log(data.data[0]));
  }

  render() {
    return (
      <div>
        <h1>{this.state.word} Component</h1>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export default Word;

import React, { Component } from "react";

import { Link } from "react-router-dom";

const DICTIONARY_KEY = process.env.REACT_APP_DICTIONARY_API_KEY;
const THESAURUS_KEY = process.env.REACT_APP_THESAURUS_API_KEY;

// https://www.dictionaryapi.com/api/v3/references/collegiate/json/cheese?key=your-api-key  DICTIONARY EX
// https://media.merriam-webster.com/soundc11/[subdirectory]/[base filename].wav  PRONOUNCIATION EX
// https://www.dictionaryapi.com/api/v3/references/thesaurus/json/umpire?key=your-api-key  THESAURUS EX

class Word extends Component {
  state = {
    word: null
  };

  componentDidMount() {
    const { word } = this.props.match.params;
    this.setState({ word: word });
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

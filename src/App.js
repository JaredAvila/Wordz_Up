import React from "react";
import Home from "./containers/Home/Home";
import WordContainer from "./containers/WordContainer/WordContainer";
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/:word" component={WordContainer} />
    </div>
  );
}

export default App;

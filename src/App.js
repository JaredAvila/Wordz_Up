import React from "react";
import Home from "./containers/Home/Home";
import Word from "./components/Word/Word";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/:word" component={Word} />
    </div>
  );
}

export default App;

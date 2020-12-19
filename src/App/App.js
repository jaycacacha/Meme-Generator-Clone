import React from "react";
import { Meme } from "../Meme-gen/meme";
import { Switch, Route } from "react-router-dom";
import { MemeGenerated } from "../Meme-Generated/meme-generated.js";
import "./App.css";

export const App = () => {
  return (
    <div className="container">
      <h1 className="title">Meme Generator</h1>
      <Switch>
        <Route exact path="/">
          <Meme />
        </Route>
        <Route path="/generated">
          <MemeGenerated />
        </Route>
      </Switch>
    </div>
  );
};

import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Favorites from "./favorites"
import Search from "./Search"
import Create from "./createMovie"
function App() {
  return (
    <div class='app'>
    <Switch>
    <Route path="/creation">
        <Create />
      </Route>
      <Route path="/favorites">
        <Favorites />
      </Route>
      <Route path="/search">
        <Search />
      </Route>

      <Route path="/">
        <HomeScreen />
      </Route>
    </Switch>
  </div>
  );
}

export default App;

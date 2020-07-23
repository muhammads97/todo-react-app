import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getUser } from "./api/calls";
import { setUser } from "./stateManagement/actions";
import { connect } from "react-redux";

const App = (props) => {
  getUser().then((user) => {
    // console.log(user);
    props.setUser(user);
  });
  return (
    <div>
      <NavBar />
    </div>
  );
};

const mapDispatchToProps = {
  setUser: setUser,
};

export default connect(null, mapDispatchToProps)(App);

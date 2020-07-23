import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Logout from "./pages/Logout";
import List from "./pages/List";

ReactDOM.render(
  <Router>
    <App />
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/logout" component={Logout} />
    <Route path="/list" component={List} />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();

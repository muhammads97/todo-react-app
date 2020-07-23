import React from "react";
import { Link, useLocation } from "react-router-dom";
import getUser from "../utils";

function NavBar(props) {
  let p = useLocation().pathname;
  let user = getUser();
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Todo List
      </Link>
      {user == null ? null : (
        <span className="navbar-brand">{`Hello, ${user.name}`}</span>
      )}
      <Link
        className="navbar-brand"
        to={p == "/signup" ? "/login" : p == "/login" ? "/signup" : "/logout"}
      >
        {p == "/signup" ? "Login" : p == "/login" ? "Signup" : "Logout"}
      </Link>
    </nav>
  );
}

export default NavBar;

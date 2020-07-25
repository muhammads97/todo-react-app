import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

function NavBar(props) {
  let p = useLocation().pathname;
  let user = props.user;
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

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(NavBar);

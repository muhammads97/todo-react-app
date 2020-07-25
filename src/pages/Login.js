import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import * as apiCalls from "../api/calls";
import { setUser } from "../stateManagement/actions";
import { connect } from "react-redux";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async (e, p) => {
    let user = await apiCalls.login(e, p);
    if (user != null) {
      props.setUser(user);
      props.history.push("/");
    }
  };
  if (props.user != null) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <div className="signup-card jumbotron">
        <div className="form-group">
          <label
            className="col-form-label col-form-label-lg"
            htmlFor="inputLarge"
          >
            Email
          </label>
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="example@gmail.com"
            id="emailInput"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label
            className="col-form-label col-form-label-lg"
            htmlFor="inputLarge"
          >
            Password
          </label>
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            id="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onClickLogin(email, password)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = {
  setUser: setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

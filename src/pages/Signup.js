import React from "react";
import { Link, Redirect } from "react-router-dom";
import getUser from "../utils";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",
      user: null,
      loading: true,
    };
  }

  onClickSignup() {
    var xhr = new XMLHttpRequest();
    // xhr.addEventListener("load", () => {

    // });
    xhr.open("POST", "http://localhost:3000/users", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.send(
      JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      })
    );
    if (xhr.status == 200) {
      let res = JSON.parse(xhr.responseText);
      localStorage.setItem("token", res.token);
      this.props.history.push("/");
    }
  }

  onChangeEmail(value) {
    this.setState({ email: value });
  }
  onChangePassword(value) {
    this.setState({ password: value });
  }
  onChangeName(value) {
    this.setState({ name: value });
  }

  componentDidMount() {
    this.setState({ user: getUser() }, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    if (this.state.user != null) {
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
              onChange={(e) => this.onChangeEmail(e.target.value)}
              value={this.state.email}
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
              onChange={(e) => this.onChangePassword(e.target.value)}
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <label
              className="col-form-label col-form-label-lg"
              htmlFor="inputLarge"
            >
              Name
            </label>
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Name"
              id="nameInput"
              onChange={(e) => this.onChangeName(e.target.value)}
              value={this.state.name}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.onClickSignup()}
          >
            Signup
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;

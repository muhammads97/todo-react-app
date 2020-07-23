import * as React from "react";

class Logout extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    localStorage.removeItem("token");
    this.props.history.push("/");
  }

  render() {
    return null;
  }
}

export default Logout;

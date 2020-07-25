import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import * as actions from "../stateManagement/actions";

const Logout = (props) => {
  localStorage.removeItem("token");
  props.logout();
  return <Redirect to="/" />;
};

const mapDispatchToProps = {
  logout: actions.logout,
};

export default connect(null, mapDispatchToProps)(Logout);

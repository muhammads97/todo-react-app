import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// const PrivateRoute = (props) => {
//   console.log(props.user);
//   return props.user == null ? (
//     <Redirect to="/login" />
//   ) : (
//     <Route component={props.component} path={props.path} />
//   );
// };

const PrivateRoute = ({ component: Component, user: user, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        user == null ? <Redirect to="/signup" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(PrivateRoute);

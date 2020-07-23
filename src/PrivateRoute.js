// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import getUser from "./utils";

// class PrivateRoute extends React.Component {
//   async componentDidMount() {
//     let user = await getUser();
//     console.log(user);
//   }

//   render() {
//     return (
//       <Route
//         {...rest}
//         render={(props) =>
//           user != null ? (
//             <Component {...props} user={user} />
//           ) : (
//             <Redirect to="/signup" />
//           )
//         }
//       />
//     );
//   }
// }

// const PrivateRoute = ({ component: Component, ...rest }) => {};

// export default PrivateRoute;

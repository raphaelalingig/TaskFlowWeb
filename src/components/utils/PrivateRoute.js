import React from "react";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../Auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route {...rest}>
      {user ? (
        // If user is authenticated, render the component associated with the route
        <Component {...rest} />
      ) : (
        // If user is not authenticated, redirect to the login page
        <Redirect to="/login" />
      )}
    </Route>
  );
};

export default PrivateRoute;

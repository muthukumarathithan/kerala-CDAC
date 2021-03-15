import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
// components
import Layout from "./Layout";
import ErrorMessage from "./ErrorMessage";

// pages
import Error from "../pages/error";
import Login from "../pages/login";


const App = ({auth}) =>{
  // global
  var isAuthenticated  = auth.isAuthenticated;
  var user_type  = '';
  if(isAuthenticated)
    user_type = auth.user.user_type;

  return (
    <HashRouter>
      <ErrorMessage />
      <Switch>
        <Route exact path="/" render={() => user_type !== 4 ? <Redirect to="/app/dashboard" />:<Redirect to="/app/customer-dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => user_type !== 4 ? <Redirect to="/app/dashboard" />:<Redirect to="/app/customer-dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}


export default connect (store => ({auth:store.auth})) (App)
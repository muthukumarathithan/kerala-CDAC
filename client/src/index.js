import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import {Provider} from 'react-redux';
import decode from 'jwt-decode';
import Themes from "./themes";
import App from "./components/App";
import {store} from './store'
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

import {setCurrentUser, setToken, addError } from './store/actions';

if(localStorage.token){
  setToken(localStorage.token);
  try {
      store.dispatch(setCurrentUser(decode(localStorage.token)));
  } catch (error) {
      store.dispatch(setCurrentUser({}));
      store.dispatch(addError(error));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider>
      <UserProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </UserProvider>
    </LayoutProvider>
  </Provider>
,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

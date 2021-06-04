import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Header from "./Components/Common/Header";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function isLoggedIn() {
  const data = JSON.parse(localStorage.getItem('user'));
  if (data && data.token) {
    return true;
  }
  return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isLoggedIn() ?
        <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
};


function App() {
  return (
    <Router >
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute component={Home} path="/home" exact />
        <Route path="*" component={Login} />
      </Switch>
      <ToastContainer />
    </Router >
  );
}

export default App;

import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LoginPage from "./pages/Login";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/login" exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/bookings" component={BookingsPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

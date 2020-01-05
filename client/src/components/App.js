import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom"; // use Switch to be able to have index(login) page without navbar
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import MainComponent from "./MainComponent";
import LoginComponent from "./LoginComponent";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    // https://stackoverflow.com/questions/47281850/how-to-hide-navbar-in-login-page-in-react-router
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginComponent} />
            <Route component={MainComponent} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);

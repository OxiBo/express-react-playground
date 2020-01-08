import React, { Component } from "react";
import { Route } from "react-router-dom"; // use Switch to be able to have index(login) page without navbar
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SignUpForm from "./authComponents/SignUpForm";
import LogInForm from "./authComponents/LogInForm";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";

class MainComponent extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="ui container">
          <Route exact path="/home" component={Landing} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/login" component={LogInForm} />
          <Route exact path="/user-profile/:userid" component={UserProfile} />
          <Route exact path="/edit-profile/:userid" component={EditProfile} />
          <Route exact path="/products" component={Dashboard} />
        </div>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(MainComponent);

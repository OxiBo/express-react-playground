import React, { Component } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom"; // use Switch to be able to have index(login) page without navbar
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SignUpForm from "./authComponents/SignUpForm";
import LogInForm from "./authComponents/LogInForm";
import UserProfile from "./profileComponents/UserProfile";
import EditProfile from "./profileComponents/EditProfile";
import ProductsList from "./productsComponents/ProductsList";
// import NotFound from "./NotFound"; //https://medium.com/@rose.espiritu1/creating-a-custom-404-notfound-page-with-react-routers-3cc9106de84

// const NotFoundRedirect = () => <Redirect to="/not-found" />;

class MainComponent extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        {/* <BrowserRouter>      */}
          <Header />
          {/* <Switch> */}
            <div className="ui container">
              <Route exact path="/home" component={Landing} />
              <Route exact path="/signup" component={SignUpForm} />
              <Route exact path="/login" component={LogInForm} />
              <Route
                exact
                path="/user-profile/:userid"
                component={UserProfile}
              />
              <Route
                exact
                path="/edit-profile/:userid"
                component={EditProfile}
              />
              <Route exact path="/products" component={ProductsList} />
              {/* <Route component={NotFound} /> */}
            </div>
          {/* </Switch> */}
        {/* </BrowserRouter> */}
      </div>
    );
  }
}

export default connect(null, { fetchUser })(MainComponent);

import React, { Component } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom"; // use Switch to be able to have index(login) page without navbar
import { connect } from "react-redux";
import { fetchUser } from "../actions";
// flesh messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { css } from "glamor";
import Header from "./Header";
import Landing from "./Landing";
// import Dashboard from "./Dashboard";
import SignUpForm from "./authComponents/SignUpForm";
import LogInForm from "./authComponents/LogInForm";
import UserProfile from "./profileComponents/UserProfile";
import EditProfile from "./profileComponents/EditProfile";
import ProductsList from "./productsComponents/ProductsList";
import OrderProduct from "./productsComponents/OrderProduct";
import ProductTestingDashboard from "./productTestingComponents/ProductTestingDashboard";
import NewReview from "./productTestingComponents/NewReview";
import EditReview from "./productTestingComponents/EditReview";
// import NotFound from "./NotFound"; //https://medium.com/@rose.espiritu1/creating-a-custom-404-notfound-page-with-react-routers-3cc9106de84

// const NotFoundRedirect = () => <Redirect to="/not-found" />;

class MainComponent extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  // notify = () => {
  //   toast(this.props.message);
  // };

  render() {
    return (
      <div>
        {this.props.message && this.notify()}{/* <BrowserRouter>      */}
        <Header />
      
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {/* <Switch> */}
        <div className="ui container">
          <Route exact path="/home" component={Landing} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/login" component={LogInForm} />
          <Route exact path="/user-profile/:userid" component={UserProfile} />
          <Route exact path="/edit-profile/:userid" component={EditProfile} />
          <Route exact path="/order/:productId" component={OrderProduct} />
          <Route exact path="/products" component={ProductsList} />
          <Route exact path="/product-testing" component={ProductTestingDashboard} />
          <Route exact path="/reviews/new" component={NewReview} />
          <Route exact path="/reviews/:reviewId/edit" component={EditReview} />
          {/* <Route component={NotFound} /> */}
        </div>
        {/* </Switch> */}
        {/* </BrowserRouter> */}
      </div>
    );
  }
}
// const mapStateToProps = ({ message }) => {
//   return {
//     message: message.message
//   };
// };
export default connect(null, { fetchUser })(MainComponent);

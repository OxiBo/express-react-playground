import React, { Component } from "react";
import { connect } from "react-redux";
import ProductTestList from "./ProductTestList";

class ProductTestingDashboard extends Component {
  render() {
    return (
      <div className="ui main container segment">
        {!this.props.current_user ? (
          <div>
            <p>You have to be logged in to visit this page</p>
          </div>
        ) : (
          <ProductTestList />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.user
  };
};
export default connect(mapStateToProps)(ProductTestingDashboard);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class LoginComponent extends Component {
  render() {
    return (
      <div className="login-flex">
        <div className="login">
          <h1>Welcome!</h1>

          <div className="ui my-buttons">
            <a href="/home" className="ui white button">
              <i className="home icon"></i>Home
            </a>
            {this.props.current_user ? (
              <>
                <a href="/api/logout" className="ui white button">
                  <i className="sign out icon"></i>Log Out
                </a>
              </>
            ) : (
              <>
                <Link to="/login" className="ui yellow button">
                  <i className="sign in alternate icon"></i>Login
                </Link>

                <Link to="/signup" className="ui green button">
                  <i className="sign in alternate icon"></i>Signup
                </Link>

                <a href="/auth/google" className="ui red google plus  button">
                  <i className="google icon"></i>
                  Log In With Google
                </a>
                <a href="/auth/facebook" className="ui facebook button">
                  <i className="facebook icon"></i>
                  Log In With Facebook
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.user
  };
};

export default connect(mapStateToProps)(LoginComponent);

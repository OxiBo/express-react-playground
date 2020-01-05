import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "../../actions";
import Dashboard from "../Dashboard";

class LogInForm extends Component {
  // class 'error' has display: none in semantic ui rules

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({
    input,
    meta,
    label,
    placeholder,
    required,
    type,
    id,
    min
  }) => {
    // const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    // console.log(meta);
    // console.log(somestuff);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label htmlFor="">{label}</label>
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          id={id}
          autoComplete="off"
          min={min}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    // console.log(formValues);
    this.props.signup(formValues, this.props.history, "login");
  };
  render() {
    return (
      <>
        {this.props.current_user ? (
          <Dashboard /> // need to add some kind of flash message
        ) : (
          <div className="ui main text container segment">
            <h2>Log In</h2>
            {this.props.authError && (
              <div className="ui error message">
                <div className="header">{this.props.authError.error}</div>
              </div>
            )}
            <form
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              action=""
              className="ui form error"
            >
              <Field
                type="text"
                required
                id="username"
                placeholder=""
                name="username"
                component={this.renderInput}
                label="Username"
              />

              <Field
                type="password"
                required
                id="password"
                placeholder=""
                name="password"
                component={this.renderInput}
                label="Password"
              />

              <button className="ui button primary">Log In</button>
              <a href="/" className="ui button orange">
                Cancel
              </a>
            </form>
          </div>
        )}
      </>
    );
  }
}

const validate = (formValues, props) => {
  const errors = {};

  if (!formValues.email) {
    // run if the user did not enter your email
    errors.email = "You must enter your email";
  }

  if (!formValues.password) {
    // run if the user did not enter your name
    errors.password = "You must enter your password";
  }
  // console.log(errors);
  return errors;
};

const mapStateToProps = ({ auth }) => {
  //   console.log("error is" + state.auth.error);
  return {
    authError: auth.error,
    current_user: auth.user
  };
};

export default reduxForm({ form: "logIn", validate })(
  connect(mapStateToProps, { signup })(withRouter(LogInForm))
);

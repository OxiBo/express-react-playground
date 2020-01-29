import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, getFormValues } from "redux-form";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import validateEmail from "../../utils/validateEmail";
import validateURL from "../../utils/validateURL";

import renderRadioInput from "../../utils/renderRadioInput";
import { signup } from "../../actions";
import axios from "axios";

class SignUpForm extends Component {
  state = {
    newUserName: false,
    errorMessage: ""
  };

  async checkUsername() {
    // console.log(this.props.formValues);
    try {
      if (this.props.formValues) {
        const { username } = this.props.formValues;
        const { data } = await axios.get(`/api/username-check/${username}`);
        this.setState({
          newUserName: data,
          errorMessage: "This username is taken. Try other name!"
        });
      }
    } catch (error) {
      console.error(error);
      this.setState({
        newUserName: true,
        errorMessage:
          "Something went wrong on our end. Not able to verify username!"
      });
    }
  }

  renderUsernameError() {
    return (
      <div
        className={`ui field ${this.state.newUserName ? "error message" : ""}`}
      >
        <div className="header">
          {this.state.newUserName && this.state.errorMessage}
        </div>
      </div>
    );
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui field error message">
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
    // console.log(input.name);
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

  renderFormFields() {
    return formFields.map(({ label, name, type }) => {
      return (
        <Field
          key={name}
          label={label}
          name={name}
          component={this.renderInput}
          type={type}
          placeholder=""
        />
      );
    });
  }

  onSubmit = formValues => {
    this.props.signup(formValues, this.props.history, "signup");
  };
  render() {
    return (
      <div className="ui main text container segment">
        {this.props.current_user ? (
          <div className="ui field error message">
            <div className="header">You need to log out first!</div>
          </div>
        ) : (
          <>
            <h2>Register as a new User</h2>
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
                onBlur={async () => await this.checkUsername()}
              />
              {this.renderUsernameError()}

              {this.renderFormFields()}

              <div className="field">
                <Field
                  name="gender"
                  label="Choose your gender"
                  component={renderRadioInput}
                  options={{
                    male: "Male",
                    female: "Female",
                    "not-defined": "Prefer not to say"
                  }}
                />
              </div>

              <button className="ui button primary">Sign Up</button>
              <a href="/" className="ui button orange">
                Cancel
              </a>
            </form>
          </>
        )}
      </div>
    );
  }
}

const validate = (formValues, props) => {
  //   console.log(props)
  const errors = {};

  if (!formValues.username) {
    // run if the user did not enter their username
    errors.username = "You must enter your username";
  }
  if (formValues.username && formValues.username.length > 40) {
    errors.username = "Your username is too long";
  }
  //   } else if (!findClient) {
  //     // run if the user did not enter correct(existing) email
  //     errors.email = "User with such email does not exist";
  //   }

  if (!formValues.email) {
    // run if the user did not enter your email
    errors.email = "You must enter your email";
  }

  if (!validateEmail(formValues.email)) {
    errors.email = "You must enter valid email";
  } // WHY IS IT RUNNING WHEN FILLING IN OTHER FORM FIELDS????
  //   } else if (!findClient) {
  //     // run if the user did not enter correct(existing) email
  //     errors.email = "User with such email does not exist";
  //   }

  if (!formValues.password) {
    // run if the user did not enter your name
    errors.password = "You must enter your password";
  }

  if (formValues.password && formValues.password.length > 20) {
    errors.password = "Your password is too long";
  }

  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = "Your passwords don't match";
  }

  if (formValues.avatarUrl && !validateURL(formValues.avatarUrl)) {
    errors.avatarUrl = "Enter valid URL";
  }

  if (formValues.occupation && formValues.occupation.length > 40) {
    errors.occupation = "Your occupation is too long";
  }

  // check if user filled in age field with a number
  if (isNaN(formValues.age)) {
    errors.age = "Your age have to be a number";
  }

  if (formValues.age && (formValues.age > 110 || formValues.age < 14)) {
    errors.age =
      "You have to be older then 14 years old and younger then 110 years old";
  }
  //   console.log(errors);
  return errors;
};

const mapStateToProps = state => {
  //   console.log("error is" + state.auth.error);
  return {
    current_user: state.auth.user,
    authError: state.auth.error,
    formValues: getFormValues("signin")(state)
  };
};

export default reduxForm({ form: "signin", validate })(
  connect(mapStateToProps, { signup })(withRouter(SignUpForm))
); // destroyOnUnmount: false, in case if i needed form to be filled in with values after the forms has been submitted

/* 

render() {
    return (
      <div class="ui main text container segment">
        <h2>Register as a new User</h2>
      </div>
    );
  }


<form action="/signup" method="POST" class="ui form fields">
            <div class="field">
              <label for="">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                required
              />
            </div>
            <div class="field">
                <label for="">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </div>
            <div class="field">
                <label for="">Gender</label>
                <input type="radio" name="gender" value="male"> Male<br>
                <input type="radio" name="gender" value="female"> Female<br>
                <input type="radio" name="gender" value="other"> Other<br>  
              </div>


            <div class="field">
                <label for="">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  placeholder="Enter your occupation"
                  required
                />
              </div>
              <div class="field">
                  <label for="">Age</label>
                  <input
                    type="number"
                    step="1"
                    name="age"
                    placeholder="Enter your age"
                    required
                  />
                </div>
            <div class="field">
              <label for="">Password</label>
              <input type="password" name="password" placeholder="Enter password" />
            </div>
            <div class="field">
              <input
                type="submit"
                class="ui button big green action"
                value="Register!"
              />
           
                <a href="/" class="ui button big red action">Cancel</a>
              </div>
          </form>


*/

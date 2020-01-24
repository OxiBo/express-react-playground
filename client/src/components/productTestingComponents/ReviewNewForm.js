import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom"; //??
// import { reviewNewFormFields }  from "./reviewFormFields"; // ???
import validateEmail from "../../utils/validateEmail";
import validateURL from "../../utils/validateURL";
import { submitEditReviewForm } from "../../actions"; // action for submitting edited form
// import { signup } from "../../actions"; // ??
// import axios from "axios"; // ???

class ReviewNewForm extends Component {
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
          min={min} // ???
        />

        {this.renderError(meta)}
      </div>
    );
  };

  renderFormFields() {
    return this.props.reviewFormFields.map(({ label, name, type }) => {
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
    // this.props.(formValues, this.props.history, "signup");
    // console.log(formValues);
    const {
      formType,
      submitEditReviewForm,
      match,
      history,
      onFormSubmit
    } = this.props;
    formType === "edit"
      ? submitEditReviewForm(formValues, match.params.reviewId, history)
      : onFormSubmit();
  };
  render() {
    // console.log(this.props);
    // const className = `field ${this.props.authError} ? "error" : ""}`;
    return (
      <div className="ui main text container segment">
        {!this.props.current_user ? (
          <div className="ui field error message">
            <div className="header">You need to log in first!</div>
          </div>
        ) : (
          <>
            <h2>
              {this.props.formType === "edit"
                ? " Edit your product testing information"
                : "Add a new product test information"}
            </h2>
            <form
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              action=""
              className="ui form error"
            >
              {this.renderFormFields()}

              <a href="/product-testing" className="ui button orange">
                Cancel
              </a>
              {this.props.formType === "edit" ? (
                <button className="ui button primary">Submit</button>
              ) : (
                <button className="ui button primary">Next</button>
              )}
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

  if (!formValues.productName) {
    // run if the user did not enter their username
    errors.productName = "You must enter  product name";
  }

  // check if user filled in price field with a number
  if (isNaN(formValues.price)) {
    errors.price = "Price have to be a number";
  }

  if (!formValues.productUrl) {
    // run if the user did not enter product url
    errors.productUrl = "You must enter product url";
  }

  if (formValues.productUrl && !validateURL(formValues.productUrl)) {
    errors.productUrl = "Enter valid URL";
  }

  if (!formValues.name) {
    // run if the user did not enter your email
    errors.name = "You must enter contact person name";
  }

  if (!formValues.profileUrl) {
    // run if the user did not enter contact profile url
    errors.profileUrl = "You must enter contact person profile url";
  }

  if (!formValues.email) {
    // run if the user did not enter contact email
    errors.email = "You must enter contact person email";
  }

  if (!validateEmail(formValues.email)) {
    errors.email = "You must enter valid email";
  } // WHY IS IT RUNNING WHEN FILLING IN OTHER FORM FIELDS????
  //   } else if (!findClient) {
  //     // run if the user did not enter correct(existing) email
  //     errors.email = "User with such email does not exist";
  //   }

  if (!formValues.orderDate) {
    // run if the user did not enter order date
    errors.orderDate = "You must enter order date";
  }
  //   console.log(errors);
  return errors;
};

const mapStateToProps = ({ auth }) => {
  //   console.log("error is" + state.auth.error);
  return {
    current_user: auth.user,
    authError: auth.error
  };
};

export default reduxForm({
  form: "newReview",
  destroyOnUnmount: false,
  validate
})(
  connect(mapStateToProps, { submitEditReviewForm })(withRouter(ReviewNewForm))
); // destroyOnUnmount: false, in case if i needed form to be filled in with values after the forms has been submitted

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
// import { connect } from 'react-redux';
import validateEmail from "../../utils/validateEmail";
import renderRadioInput  from "../../utils/renderRadioInput";


class EditProfileForm extends Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui field error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }


  renderInput = ({ input, meta, label, placeholder, type, id }) => {
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
        />

        {this.renderError(meta)}
      </div>
    );
  };

  render() {
      const { name, avatar }  = this.props.user;

    return (
      <form
        onSubmit={this.props.handleSubmit((values)=> this.props.onFormSubmit(values))}
        action=""
        className="ui form error"
      >
        <div className="ui horizontal segments">
          <div className="ui content image">
            <img
              className="ui medium description  image"
              src={avatar}
              alt=""
            />
          </div>

          <div className="ui content segment">
            <h2 className="header">{name}</h2>
            {Object.entries(this.props.userDetails).map(info => {
              return (
                <div key={info[0]} className="description">
                  <Field
                    key={info[0]}
                    label={info[0].toUpperCase()}
                    name={info[0]}
                    component={this.renderInput}
                    type="text"
                    placeholder={info[1]}
                  />
                </div>
              );
            })}
            <div className="field">
                <Field
                  name="gender"
                  label="CHOOSE YOUR GENDER"
                  component={renderRadioInput}
                  options={{
                    male: "Male",
                    female: "Female",
                    notDefined: "Prefer not to say"
                  }}
                />
              </div>
          </div>
        </div>
        <div className="buttons">
          <a href={`/user-profile/${this.props.id}`} className="ui button big right orange">
            Cancel
          </a>
          <button className="ui button big primary">Submit</button>
        </div>
      </form>
    );
  }
}
const validate = (formValues, props) => {
  //   console.log(props)
  const errors = {};

  

  // if (!formValues.email) {
  //   // run if the user did not enter your email
  //   errors.email = "You must enter your email";
  // }

  if (!validateEmail(formValues.email)) {
    errors.email = "You must enter valid email";
  } 

  // if (formValues.avatarUrl && !validateURL(formValues.avatarUrl)) {
  //   errors.avatarUrl = "Enter valid URL";
  // }

  if (formValues.occupation && formValues.occupation.length > 40) {
    errors.occupation = "Your occupation is too long";
  }

  // check if user filled in age field with a number
  if(isNaN(formValues.age)){
    errors.age =
    "Your age have to be a number";
  }

  if (formValues.age && (formValues.age > 110 || formValues.age < 14)) {
    errors.age =
      "You have to be older then 14 years old and younger then 110 years old";
  }
  //   console.log(errors);
  return errors;
};

export default reduxForm({ form: "editProfileForm", enableReinitialize: true, validate })(EditProfileForm); // destroyOnUnmount: false, in case if i needed form to be filled in with values after the forms has been submitted

// export default reduxForm({ form: "editProfileForm", enableReinitialize: true, validate })(connect(null, { editProfile })(EditProfileForm)); 

/*  <div className="ui main text container segment">
{this.props.current_user ? (
    <div className="ui field error message">
      <div className="header">You need to log out first!</div>
    </div>
  ) : (
    <>
      <h2 className="ui huge header">Edit profile</h2>
      {this.renderContent(this.props.current_user)}
    </>
  )}
</div>
*/

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class EditProfileForm extends Component {

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

        {/* {this.renderError(meta)} */}
      </div>
    );
  };

  render() {
      const { name, avatar }  = this.props.user;
   
    //  console.log(this.props)
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}
        action=""
        className="ui form error"
      >
        <div className="ui horizontal segments">
          <div className="ui content image">
            <img
              className="ui medium description  image"
              src={avatar}
              alt="profile picture"
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
                    placeholder={info[1] || "Not specified"}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="buttons">
          <a href="/" className="ui button big right orange">
            Cancel
          </a>
          <button className="ui button big primary">Submit</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: "editProfileForm", enableReinitialize: true })(EditProfileForm); // destroyOnUnmount: false, in case if i needed form to be filled in with values after the forms has been submitted

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

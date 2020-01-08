import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { reduxForm, Field } from "redux-form";
import EditProfileForm from "./EditProfileForm";

class EditProfile extends Component {
  onFormSubmit(values) {
    console.log(values);
  }
  renderContent(userData) {
    const { avatar, age, gender, occupation } = userData.bio;
    let userDetails = { age, gender, occupation };
    let user = { avatar, createdAt: userData.createdAt };
    if (userData.google) {
      user.name = userData.google.name;
      userDetails.email = userData.google.email;
    } else if (userData.facebook) {
      user.name = userData.facebook.name;
      userDetails.email = userData.facebook.email;
    } else {
      user.name = userData.local.username;
      userDetails.email = userData.local.email;
    }
    return (
      <div className="item">
        <EditProfileForm
          initialValues={userDetails}
          user={user}
          userDetails={userDetails}
          onFormSubmit={this.onFormSubmit}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="ui main text container segment">
        {this.props.current_user && (
          <>
            <h2 className="ui huge header">Edit profile</h2>
            {this.renderContent(this.props.current_user)}
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  //   console.log("error is" + state.auth.error);
  return {
    current_user: state.auth.user,
    authError: state.auth.error

    //   formValues: getFormValues("signin")(state)
  };
};

export default connect(mapStateToProps)(EditProfile); // destroyOnUnmount: false, in case if i needed form to be filled in with values after the forms has been submitted

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

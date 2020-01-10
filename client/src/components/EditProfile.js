import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { reduxForm, Field } from "redux-form";
import EditProfileForm from "./EditProfileForm";
import { editProfile } from "../actions";
import  filterObj  from '../utils/objectFilter'
class EditProfile extends Component {


  onFormSubmit = (values) => {
    // filter form values to get rid of blank fields and prevent overriding values in the database
   values = filterObj(values, field => field !== "")
  //  console.log(filtered)
    this.props.editProfile(values, this.props.current_user._id, this.props.history);
  }
  renderContent(userData) {
    const { avatar, age, gender, occupation, email } = userData.bio;
    let userDetails = { age, gender, occupation, email, avatar };
    let user = { avatar, createdAt: userData.createdAt };
    if (userData.google) {
      user.name = userData.google.name;
      // userDetails.email = userData.google.email;
    } else if (userData.facebook) {
      user.name = userData.facebook.name;
      // userDetails.email = userData.facebook.email;
    } else {
      user.name = userData.local.username;
      // userDetails.email = userData.local.email;
    }
    return (
      <div className="item">
        <EditProfileForm
          initialValues={userDetails}
          user={user}
          userDetails={{ avatar, occupation, email, age}}
          onFormSubmit={this.onFormSubmit}
        />
      </div>
    );
  }

  render() {
    // console.log(this.props)
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

export default connect(mapStateToProps, { editProfile })(EditProfile); // destroyOnUnmount: false, in case if i needed form to be filled in with values after the forms has been submitted

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

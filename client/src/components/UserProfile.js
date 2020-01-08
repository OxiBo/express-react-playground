import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class UserProfile extends Component {
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

    console.log(user);
    console.log(userDetails)
    const { name, createdAt } = user;
    return (
      <div className="item">
        <div className="ui horizontal segments">
          <div className="ui content image">
            <img
              className="ui  medium description rounded image"
              src={avatar}
              alt="profile picture"
            />
          </div>

          <div className="ui content segment">
            <h2 className="header">{name}</h2>

            <div className="meta">
              <span>CREATED: </span>
              <span className="">
                {new Date(createdAt).toLocaleDateString("en-EN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
            </div>

            {Object.entries(userDetails).map(info => {
              return (
                <div key={info[0]} className="description">
                  <span>{info[0].toUpperCase()}: </span>
                  <span className="ui header">
                    {info[1] || "Not specified"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="buttons">
          <a href="/home" className="ui secondary basic button">
            <i className="arrow left icon"></i>Go Back or Go Home
          </a>
          <Link
            className="ui orange right basic button"
           to={`/edit-profile/${userData._id}`}
          >
            EDIT
          </Link>
        </div>
      </div>
    );
  }
  render() {
    // console.log(this.props.current_user);
    return (
      <div className="ui main text container segment show">
        {this.props.current_user && (
          <>{this.renderContent(this.props.current_user)}</>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    current_user: state.auth.user
  };
};

export default connect(mapStateToProps)(UserProfile);

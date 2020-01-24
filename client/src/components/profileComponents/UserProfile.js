import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser, fetchOrders } from "../../actions";
import calcPaymentAmount from "../../utils/calcPaymentAmount";

class UserProfile extends Component {
  state = {
    orders: false
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  renderOrderList() {
    return (
      <div className="ui segments">
        <div className="extra">
          {!this.props.orderList.length ? (
            <div className="ui container">
              <div className="ui text segment">
              <p>You don't have orders yet!</p>
              </div>
          
            </div>
          
          ) : (
            <table className="ui unstackable table">
              <thead>
                <tr>
                  <th>Product name</th>
                  <th>Order date</th>
                  <th>Price, $</th>
                  <th>Taxes</th>
                  <th className="right aligned">Order total, $</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.state.orders && this.renderOrderList()} */}
                {this.props.orderList.map(
                  ({ items, createdAt, total }, index) => {
                    const { name, price } = items[0];
                    return (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>
                          {new Date(createdAt).toLocaleDateString("en-EN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </td>
                        <td>{calcPaymentAmount(price).amount}</td>
                        <td>{calcPaymentAmount(price).taxes}</td>
                        <td className="right aligned">
                          {calcPaymentAmount(price).total}
                        </td>
                      </tr>
                    );
                  }
                )}
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="right aligned">
                    <strong>
                      {(
                        this.props.orderList.reduce((acc, order) => {
                          acc += order.total;
                          return acc;
                        }, 0) / 100
                      ).toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  renderContent(userData) {
    const { avatar, age, gender, occupation, email } = userData.bio;
    let userDetails = { age, gender, occupation, email };
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

    // console.log(user);
    // console.log(userDetails)
    const { name, createdAt } = user;
    return (
      <div className="item">
        <div className="ui horizontal segments">
          <div className="ui content image">
            <img
              className="ui  medium description rounded image"
              src={avatar}
              alt=""
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
                  <span className="ui header">{info[1]}</span>
                </div>
              );
            })}
            <div className="item">
              <button
                className="ui secondary basic button"
                onClick={async () => {
                  await this.props.fetchOrders(userData._id);
                  await this.setState(prevState => ({
                    orders: !prevState.orders
                  }));
                }}
              >
                {this.state.orders ? "Hide orders" : "Show orders"}
              </button>
            </div>
          </div>
        </div>
        {this.state.orders && this.renderOrderList()}
        <div className="buttons">
          <a href="/home" className="ui secondary basic button">
            <i className="arrow left icon"></i>Go Home
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
        {this.props.current_user ? (
          <>{this.renderContent(this.props.current_user)}</>
        ) : (
          <p>Error on our server side....</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  // console.log(auth.user)
  return {
    current_user: auth.user,
    orderList: auth.orders
  };
};

export default connect(mapStateToProps, { fetchUser, fetchOrders })(
  UserProfile
);

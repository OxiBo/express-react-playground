import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchReviews } from "../../actions";

class ProductTestingDashboard extends Component {
  componentDidMount() {
    this.props.fetchReviews();
  }

  renderReviewList(){
    // https://stackoverflow.com/questions/30142361/react-js-uncaught-typeerror-this-props-data-map-is-not-a-function
    return Array.from(this.props.reviewList).map(
      (
        {
          productName,
          productUrl,
          price,
          orderDate,
          contact,
          reviewSubmitDate,
          refundDate,
          reviewUrl,
          _id
        },
        index
      ) => {
        const style = refundDate ? "positive" : "negative";
        return (
          <tr
            key={`${index}-${productName}`}
            className={`center aligned ${style}`}
          >
            <td>
              <a href={productUrl} target="_blank" rel="noopener noreferrer">
                {productName}
              </a>
            </td>
            <td>{price.toFixed(2)}</td>
            <td>
              <a href={`${contact.profileUrl}`} target="_blank" rel="noopener noreferrer">
                {contact.name}
              </a>
              , <br/>{contact.email}
            </td>
            <td>{new Date(orderDate).toLocaleDateString()}</td>
            <td>
              {reviewSubmitDate ? (
                <a href={reviewUrl} target="_blank" rel="noopener noreferrer">{new Date(reviewSubmitDate).toLocaleDateString()}</a>
              ) : (
                "---"
              )}
            </td>
            <td className="">
              {refundDate ? new Date(refundDate).toLocaleDateString() : "---"}
            </td>
            <td><Link to={`/reviews/${_id}/edit`}><i className="edit icon"></i></Link></td>
          </tr>
        );
      }
    );
  };

  render() {
    return (
      <div className="ui main container segment">
        {!this.props.current_user ? (
          <div>
            <p>You have to be logged in to visit this page</p>
          </div>
        ) : (
          <>
            <div className="ui main content">
              <div className="ui centered grid">
                <h2 className="ui left floated header middle aligned">
                  Products testing list
                </h2>

                <Link
                  to="/reviews/new"
                  className="ui right floated circular icon yellow big button"
                >
                  <i className="icon plus"></i>
                </Link>
              </div>
            </div>
            <div className="ui main">
              {this.props.reviewList.length ? (
              <table className="ui celled stripped table">
                <thead>
                  <tr className="center aligned">
                    <th>Product name</th>
                    <th>Price, $</th>
                    <th>Contact</th>
                    <th>Order date</th>
                    <th>Review submit date</th>
                    <th>Refund date</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.reviewList && this.renderReviewList()}
                </tbody>
              </table>) : (<div className="ui segment center aligned "><h4>You don't have any tests in your list yet</h4></div>)}
            </div>
            
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, reviews }) => {
  return {
    current_user: auth.user,
    reviewList: reviews.reviews
  };
};
export default connect(mapStateToProps, { fetchReviews })(
  ProductTestingDashboard
);

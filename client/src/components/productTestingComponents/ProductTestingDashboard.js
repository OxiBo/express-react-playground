import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchReviews, findByProduct, chooseSortBy } from "../../actions";
import filterReviews from "../../utils/filterReviews";

class ProductTestingDashboard extends Component {
  componentDidMount() {
    this.props.fetchReviews();
  }

  renderReviewList() {
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
          refundAmount,
          _id
        },
        index
      ) => {
        const style = refundDate ? "positive" : "negative";
        // console.log(new Date(refundDate).toLocaleDateString());
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
              <a
                href={`${contact.profileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.name}
              </a>
              , <br />
              {contact.email}
            </td>
            <td>{new Date(orderDate).toLocaleDateString()}</td>
            <td>
              {reviewSubmitDate ? (
                <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
                  {new Date(reviewSubmitDate).toLocaleDateString()}
                </a>
              ) : (
                "---"
              )}
            </td>
            <td className="">
              {refundDate ? new Date(refundDate).toLocaleDateString() : "---"}
            </td>
            <td>{refundAmount ? refundAmount.toFixed(2) : "---"}</td>
            <td>
              <Link to={`/reviews/${_id}/edit`}>
                <i className="edit icon"></i>
              </Link>
            </td>
          </tr>
        );
      }
    );
  }

  calcTotals = reviews => {
    const totals = reviews.reduce(
      (acc, review) => {
        acc.total += review.price;
        acc.refund += review.refundAmount ? review.refundAmount : 0;
        return acc;
      },
      { total: 0, refund: 0 }
    );
    return {
      total: totals.total.toFixed(2),
      refund: totals.refund.toFixed(2)
    };
  };

  renderTotals() {
    return (
      <tfoot className="full-width">
        <tr>
          <th className="ui left aligned">
            <strong>Total</strong>
          </th>
          <th className="ui center aligned">
            <strong>$ {this.calcTotals(this.props.reviewList).total}</strong>
          </th>

          <th colSpan="5" className="ui right aligned">
            <strong>$ {this.calcTotals(this.props.reviewList).refund}</strong>
          </th>
          <th></th>
        </tr>
      </tfoot>
    );
  }

  renderSortAndFilter() {
    return (
      <div className="ui two column center aligned grid">
        {/* <div class="middle aligned row"> */}
        <div className="column right aligned">
          <label htmlFor=""> Find by product name:</label>
          <div className="ui input">
            <input
              placeholder="Enter product name"
              type="text"
              className="validate"
              id="findByProductName"
              name="findByProductName"
              value={this.props.productNameToFind} // titleToFind
              onChange={e => {
                console.log(e.target.value);

                this.props.findByProduct(e.target.value);
              }}
            />
            {/* <label htmlFor="findByTitle">Enter Title</label> */}
          </div>
        </div>

        <div className="column left aligned">
          {/* <div className="field item"> */}
          {/* <div className="field"> */}
          <label>Sort your products </label>
          <select
            className="ui dropdown"
            value={this.props.filterCriteria}
            onChange={e => {
              console.log(e.target.value);
              this.props.chooseSortBy(e.target.value);
            }}
          >
            <option value="" disabled>
              Sort By
            </option>
            <option value="productName">product name</option>
            <option value="newest">newest</option>
            <option value="oldest">oldest</option>
            <option value="refundStatus">refund status</option>
            <option value="refundLatest">latest refund date</option>
            <option value="refundOldest">oldest refund date</option>
          </select>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props.reviewList);
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
                <>
                  {this.renderSortAndFilter()}
                  <table className="ui celled stripped table">
                    <thead>
                      <tr className="center aligned">
                        <th>Product name</th>
                        <th>Price, $</th>
                        <th>Contact</th>
                        <th>Order date</th>
                        <th>Review submit date</th>
                        <th>Refund date</th>
                        <th>Refund amount</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.reviewList && this.renderReviewList()}
                    </tbody>
                    {this.props.reviewList && this.renderTotals()}
                  </table>
                </>
              ) : (
                <div className="ui segment center aligned ">
                  <h4>You don't have any tests in your list yet</h4>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, reviews, filter }) => {
  // console.log(
  //   filterReviews(
  //     reviews,
  //     filter,
  //     filter === "sort" ? filter.filterByCriteria : filter.productNameToFind
  //   ).reviews
  // );
  return {
    current_user: auth.user,

    reviewList: filterReviews(
      reviews.reviews,
      filter.filter,
      filter.filter === "sort"
        ? filter.filterByCriteria
        : filter.productNameToFind
    ),

    // reviewList: reviews.reviews,
    filterCriteria: filter.filterByCriteria,
    productNameToFind: filter.productNameToFind
  };
};
export default connect(mapStateToProps, {
  fetchReviews,
  findByProduct,
  chooseSortBy
})(ProductTestingDashboard);

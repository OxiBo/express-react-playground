import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import FilterReviewsController from "./FilterReviewsController";
import { fetchReviews, findByProduct, chooseSortBy } from "../../actions";
import filterReviews from "../../utils/filterReviews";

class ProductTestList extends Component {
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

  render() {
    return (
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
          {this.props.filterType || this.props.reviewList.length ? (
            <>
              <FilterReviewsController />
              {this.props.filterType && !this.props.reviewList.length ? (
                <div class="ui negative message">
                  <div class="header">No products matching your search</div>
                </div>
              ) : (
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
              )}
            </>
          ) : (
            <div className="ui segment center aligned ">
              <h4>You don't have any tests in your list yet</h4>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ reviews, filter }) => {
  const { filterType, filterByCriteria, productNameToFind } = filter;
  return {
    filterType,
    filter,
    reviewList: filterReviews(
      reviews.reviews,
      filterType,
      filterType === "sort" ? filterByCriteria : productNameToFind
    )
  };
};
export default connect(mapStateToProps, {
  fetchReviews,
  findByProduct,
  chooseSortBy
})(ProductTestList);

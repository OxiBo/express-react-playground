import React, { Component } from "react";
import { connect } from "react-redux";

import { findByProduct, chooseSortBy } from "../../actions";

class FilterReviewsController extends Component {
  render() {
    return (
      <div className="ui two column center aligned grid">
        <div className="column right aligned">
          <label htmlFor=""> Find by product name:</label>
          <div className="ui input">
            <input
              placeholder="Enter product name"
              type="text"
              className="validate"
              id="findByProductName"
              name="findByProductName"
              value={this.props.productNameToFind} 
              onChange={e => {
                this.props.findByProduct(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="column left aligned">
          <label>Sort your products </label>
          <select
            className="ui dropdown"
            value={this.props.filterCriteria}
            onChange={e => {
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
}
const mapStateToProps = ({ filter }) => {
  const { filterByCriteria, productNameToFind } = filter;
  return {
    filterCriteria: filterByCriteria,
    productNameToFind: productNameToFind
  };
};
export default connect(mapStateToProps, {
  findByProduct,
  chooseSortBy
})(FilterReviewsController);

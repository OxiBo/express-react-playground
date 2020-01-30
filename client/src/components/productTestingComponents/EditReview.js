import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReviewNewForm from "./ReviewNewForm";

import { fetchReview } from "../../actions";
import { reviewNewFormFields, reviewEditFormFields } from "./reviewFormFields"; // ???

const formFields = [...reviewNewFormFields, ...reviewEditFormFields];

class EditReview extends Component {
  componentDidMount() {
    // console.log(this.props);
    const { match, history } = this.props;
    this.props.fetchReview(match.params.reviewId, history);
  }

  renderEditForm() {
    console.log(this.props.review);
    const {
      productName,
      productUrl,
      price,
      contact: { name, profileUrl, email },
      orderDate,
      reviewSubmitDate,
      reviewUrl,
      refundAmount
    } = this.props.review;

    // format dates to make redux form render proper initial values; format - https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    const formatedOrderDate = new Date(orderDate).toISOString().split("T")[0];
    const formatedReviewSubmitDate =
      reviewSubmitDate &&
      new Date(reviewSubmitDate).toISOString().split("T")[0];
    return (
      <ReviewNewForm
        form="editReviewForm" // without this prop this prop the new form will be filled in with initial values from previous form
        reviewFormFields={formFields}
        initialValues={{
          productName,
          productUrl,
          price,
          name,
          profileUrl,
          email,
          orderDate: formatedOrderDate,
          reviewSubmitDate: formatedReviewSubmitDate,
          reviewUrl,
          refundAmount
        }}
        formType={"edit"}
      />
    );
  }

  render() {
    return <>{this.props.review && this.renderEditForm()}</>;
  }
}

const mapStateToProps = state => {
  return {
    review: state.reviews.review
  };
};
export default connect(mapStateToProps, { fetchReview })(
  withRouter(EditReview)
);

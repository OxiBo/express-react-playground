import React, { Component } from "react";
import { reduxForm } from "redux-form";

import ReviewNewForm from "./ReviewNewForm";
import ReviewNewCheck from "./ReviewNewCheck";
import { reviewNewFormFields } from "./reviewFormFields"; // ???

class NewReview extends Component {
  state = {
    showCheckReviewForm: false
  };

  renderContent() {
    if (this.state.showCheckReviewForm) {
      return (
        <ReviewNewCheck
          
          onCancel={() => this.setState({ showCheckReviewForm: false })}
        />
      );
    }
    return (
      <ReviewNewForm
        
        reviewFormFields={reviewNewFormFields}
        onFormSubmit={() => this.setState({ showCheckReviewForm: true })}
      />
    );
  }

  render() {
    return <>{this.renderContent()}</>;
  }
}

export default reduxForm({ form: "newReview"  })(NewReview);

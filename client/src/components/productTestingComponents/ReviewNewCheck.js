import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { reviewNewFormFields } from "./reviewFormFields"; 
import { submitNewReviewForm } from '../../actions';

const ReviewNewCheck = ({ onCancel, formValues, submitNewReviewForm, history }) => {

  const renderFormInfo = reviewNewFormFields.map(({ name, label }) => {
    return (
      <div className="ui vertical segment" key={name}>
        <label htmlFor="" className=''>{label}</label>
        <div className="ui header">
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div className="ui main text container segment">
      <h3>Confirm entered information:</h3>
      {renderFormInfo}
      <button onClick={onCancel} className="ui button orange">Back</button>

      <button
        onClick={() => submitNewReviewForm(formValues, history)}
        className="ui button green"
      >
       Submit
        <i className="arrow alternate circle up outline"></i>
      </button>

    </div>
  );
};

const mapStateToProps = state => {
  // console.log(state.form.surveyForm.values)
  return {
    formValues: state.form.newReview.values
  };
};

export default connect(mapStateToProps, { submitNewReviewForm })(withRouter(ReviewNewCheck));

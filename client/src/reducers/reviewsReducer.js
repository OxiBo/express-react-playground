import { FETCH_REVIEWS, REVIEWS_ERROR, FETCH_REVIEW } from "../actions/types";

const defaultReviewsState = {
  reviews: [],
  review: null,
  error: ""
};

export default (state = defaultReviewsState, action) => {
  // console.log(action);
  switch (action.type) {
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        error: ""
      };
    case FETCH_REVIEW:
      return {
        ...state,
        review: action.payload,
        error: ""
      };
    case REVIEWS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

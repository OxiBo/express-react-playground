import { FETCH_LAST_ORDER, ORDER_ERROR } from "../actions/types";

const defaultOrderState = {
  order: null,
  error: ""
};

export default (state = defaultOrderState, action) => {
  // console.log(action);
  switch (action.type) {
    case FETCH_LAST_ORDER:
      return {
        ...state,
        order: action.payload,
        error: ""
      };

    case ORDER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

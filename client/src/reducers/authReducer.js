import { FETCH_USER, FETCH_ORDERS, AUTH_ERROR } from "../actions/types";

const defaultAuthState = {
    user: null,
    error: "",
    orders: null
};

export default (state = defaultAuthState, action) => {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload || null
      };
      case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload || null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload || null
      };
      
    default:
      return state;
  }
};

import { FETCH_USER, AUTH_ERROR } from "../actions/types";

const defaultAuthState = {
    user: null,
    error: ""
};

export default (state = defaultAuthState, action) => {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload || false
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload || false
      };
      
    default:
      return state;
  }
};

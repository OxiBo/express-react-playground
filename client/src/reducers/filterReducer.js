import { SORT_BY, FIND_BY_PRODUCT } from "../actions/types";
const defaultFilterReducer = { filter: "", filterByCriteria: "", productNameToFind: "" };
export default (state = defaultFilterReducer, action) => {
  //   console.log(action);
  //   console.log("??" + action.payload)
  switch (action.type) {
    case SORT_BY:
      return {
        ...state,
        filter: 'sort',
        filterByCriteria: action.payload
      };
    case FIND_BY_PRODUCT:
      return {
        ...state,
        filter: "find",
        productNameToFind: action.payload
      };
    default:
      return state;
  }
};

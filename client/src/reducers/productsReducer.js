import { FETCH_PRODUCTS, FETCH_PRODUCT, PRODUCT_ERROR } from "../actions/types";

const defaultProductsState = {
  products: [],
  product: null,
  error: ""
};

export default (state = defaultProductsState, action) => {
  // console.log(action);
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        error: ""
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        error: ""
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

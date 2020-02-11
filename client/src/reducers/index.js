import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import productsReducer from "./productsReducer";
import orderReducer from "./orderReducer";
import reviewsReducer from "./reviewsReducer";
import filterReducer from "./filterReducer";
// import fleshMessageReducer from "./fleshMessageReducer";
// import surveysReducer from './surveysReducer';
// import errorReducer from './errorReducer'
// import sortReducer from "./sortReducer";


export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  products: productsReducer,
  order: orderReducer,
  reviews: reviewsReducer,
  filter: filterReducer
  // message: fleshMessageReducer
//   surveys: surveysReducer,
//   error: errorReducer,
//   sortBy: sortReducer
});

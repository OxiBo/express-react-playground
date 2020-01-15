import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import productsReducer from "./productsReducer";
// import surveysReducer from './surveysReducer';
// import errorReducer from './errorReducer'
// import sortReducer from "./sortReducer";


export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  products: productsReducer
//   surveys: surveysReducer,
//   error: errorReducer,
//   sortBy: sortReducer
});

// import history from "../../history";
import { toast } from "react-toastify";
import { css } from "glamor";

import {
  FETCH_USER,
  AUTH_ERROR,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  PRODUCT_ERROR,
  FETCH_LAST_ORDER,
  ORDER_ERROR,
  FETCH_ORDERS,
  FETCH_REVIEWS,
  FETCH_REVIEW,
  REVIEWS_ERROR
} from "./types";
import axios from "axios";

const tostOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  className: css({
    background: "rgba(212, 243, 221, 0.95) !important",
    color: "green!important",
    fontWeight: "bold",
    height: "50px!important",
    borderRadius: "5px!important"
  })
};

const errorTostStyle = {
  ...tostOptions,
  className: css({
    background: "rgba(255,229,229, 0.95)!important",
    color: "red!important",
    fontWeight: "bold",
    borderRadius: "5px!important"
  })
};

// toast("Custom style",{
//   className: 'tost-style',
//   // bodyClassName: "grow-font-size",
//   // progressClassName: 'fancy-progress-bar'
// });

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/current_user");
    // console.log(res.data)
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    console.error(error);
    // dispatch({ type: AUTH_ERROR, payload: error.response.data });
    // history.push('/home')
  }
};

export const fetchOrders = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${userId}`);
    // console.log(res.data)
    dispatch({ type: FETCH_ORDERS, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
    // history.push('/home')
  }
};

export const signup = (formValues, history, type) => async dispatch => {
  try {
    // console.log(formValues);
    const res = await axios.post(`/api/${type}`, formValues);
    // console.log(res);
    // if (res.data.error) {
    //   dispatch({ type: AUTH_ERROR, payload: res.data.error });
    //   toast("Sorry! Failed to log in!", errorTostStyle);
    //   // dispatch({ type: FLESH_MESSAGE, payload: {error: true, message: 'Sorry! Failed to log in!'}});
    //   history.push(`/${type}`);
    // } else {
    dispatch({ type: AUTH_ERROR, payload: "" });
    dispatch({ type: FETCH_USER, payload: res.data });
    toast("You have successfully signed in!", tostOptions);
    // dispatch({ type: FLESH_MESSAGE, payload: {error: false, message: 'You have successfully logged in!'}});
    history.push("/home");
    // }
  } catch (error) {
    console.error(error);
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
    toast("Sorry! Failed to log in!", errorTostStyle);
    // dispatch({ type: FLESH_MESSAGE, payload: {error: true, message: 'Sorry! Failed to log in!'}});
    history.push(`/${type}`);
  }
};

// export const login = (formValues, history) => async dispatch => {
//     try {
//       // console.log(formValues);
//       const res = await axios.post("/api/login", formValues);
//       // console.log(res);
//       if (res.data.error) {
//         dispatch({ type: AUTH_ERROR, payload: res.data.error });
//         history.push("/login");
//       } else {
//         dispatch({ type: AUTH_ERROR, payload: "" });
//         dispatch({ type: FETCH_USER, payload: res.data });
//         history.push("/home");
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch({ type: AUTH_ERROR, payload: error.response.data });
//       history.push("/");
//     }
//   };

export const editProfile = (formValues, userId, history) => async dispatch => {
  try {
    const res = await axios.patch(`/api/edit-profile/${userId}`, formValues);
    // console.log(res);
    // if (res.data.error) {
    //   dispatch({ type: AUTH_ERROR, payload: res.data.error });
    //   history.push(`/user-profile/${userId}`);
    // } else {
    dispatch({ type: AUTH_ERROR, payload: "" });
    dispatch({ type: FETCH_USER, payload: res.data });
    toast("You have successfully edited your profile!", tostOptions);
    history.push(`/user-profile/${userId}`);
    // }
  } catch (error) {
    console.error(error);
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
    toast("Problem on our side. Failed to edit profile!", errorTostStyle);
    history.push(`/user-profile/${userId}`);
  }
};

export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/products");
    // console.log(res.data)
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
  } catch (error) {
    console.error(error);
    // dispatch({ type: AUTH_ERROR, payload: error.response.data });
    toast(
      "Problem on the server side. Failed to load products list",
      errorTostStyle
    );
    // history.push('/home')
  }
};

export const fetchProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    // console.log(res.data);
    dispatch({ type: FETCH_PRODUCT, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data });
    toast("Failed to load product information!", errorTostStyle);
    // history.push('/home')
  }
};

export const handleStripeToken = (
  token,
  name,
  productId,
  amount,
  history
) => async dispatch => {
  try {
    // console.log(token)
    // console.log(productId)

    const res = await axios.post("/api/stripe-payment", {
      token,
      name,
      productId,
      amount
    });
    // console.log(res);
    if (res.data.user) {
      dispatch({ type: FETCH_USER, payload: res.data.user });
    }
    // console.log(res.data)
    dispatch({ type: FETCH_LAST_ORDER, payload: res.data.newOrder }); // ???
    toast("You have successfully placed your order!", tostOptions);
    // dispatch({ type: AUTH_ERROR, payload: "" });//???
    // dispatch({ type: FLESH_MESSAGE, payload: {error: false, message: 'You have successfully placed your order!'}}); // ???
    history.push("/products");
  } catch (error) {
    console.error(error);
    // dispatch({ type: AUTH_ERROR, payload: error.response.data });
    // dispatch({ type: FLESH_MESSAGE, payload: {error: true, message: 'Sorry! We cannot process your order at this time!'}});
    dispatch({ type: ORDER_ERROR, payload: error.response.data });
    toast("Failed to process your order!", errorTostStyle);
  }
};

export const fetchReviews = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/reviews");
    dispatch({ type: FETCH_REVIEWS, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: REVIEWS_ERROR, payload: error.response.data }); // ???
    const current_user = getState().auth.user;
    if (current_user) {
      toast("Sorry! Failed to load review list!", errorTostStyle);
    }
  }
  //   history.push("/product-testing");
};

export const fetchReview = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/${id}`);
    // console.log(res.data)
    dispatch({ type: FETCH_REVIEW, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: REVIEWS_ERROR, payload: error.response.data }); // ???
    toast("Sorry! Failed to load the review!", errorTostStyle);
    history.push("/product-testing");
  }
};

export const submitNewReviewForm = (formValues, history) => async dispatch => {
  try {
    const res = await axios.post("/api/reviews", formValues);
    dispatch({ type: FETCH_REVIEWS, payload: res.data });
    toast("You have successfully submitted the form", tostOptions);
  } catch (error) {
    console.error(error);
    dispatch({ type: REVIEWS_ERROR, payload: error.response.data }); // ???
    toast("Sorry! Failed to submit the form!", errorTostStyle);
  }
  history.push("/product-testing");
};

export const submitEditReviewForm = (
  formValues,
  reviewId,
  history
) => async dispatch => {
  try {
    const res = await axios.patch(`/api/reviews/${reviewId}/edit`, formValues);
    // console.log(res);
    toast("You have successfully edited your review details!", tostOptions);

    // }
  } catch (error) {
    console.error(error);
    dispatch({ type: REVIEWS_ERROR, payload: error.response.data });
    toast(
      "Problem on our side. Failed to edit review details!",
      errorTostStyle
    );
  }
  history.push(`/product-testing`);
};

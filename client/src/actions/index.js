// import history from "../../history";
import {
  FETCH_USER,
  AUTH_ERROR,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  PRODUCT_ERROR, 
  FETCH_LAST_ORDER,
  ORDER_ERROR,
} from "./types";
import axios from "axios";

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

export const signup = (formValues, history, type) => async dispatch => {
  try {
    // console.log(formValues);
    const res = await axios.post(`/api/${type}`, formValues);
    // console.log(res);
    if (res.data.error) {
      dispatch({ type: AUTH_ERROR, payload: res.data.error });
      history.push(`/${type}`);
    } else {
      dispatch({ type: AUTH_ERROR, payload: "" });
      dispatch({ type: FETCH_USER, payload: res.data });
      history.push("/home");
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
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
    console.log(res);
    // if (res.data.error) {
    //   dispatch({ type: AUTH_ERROR, payload: res.data.error });
    //   history.push(`/user-profile/${userId}`);
    // } else {
    dispatch({ type: AUTH_ERROR, payload: "" });
    dispatch({ type: FETCH_USER, payload: res.data });
    history.push(`/user-profile/${userId}`);
    // }
  } catch (error) {
    console.error(error);
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
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
    // dispatch({ type: AUTH_ERROR, payload: "" });//???
    history.push("/products");
  } catch (error) {
    console.error(error);
    // dispatch({ type: AUTH_ERROR, payload: error.response.data });
    dispatch({ type: ORDER_ERROR, payload: error.response.data });
  }
};

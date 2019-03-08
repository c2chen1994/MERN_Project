import history from "../history";
import customers from "../apis/customers";
import log from "../apis/log";

import {
  //SIGN_IN,
  //SIGN_OUT,
  FETCH_USER,
  CREATE_CUSTOMER,
  FETCH_CUSTOMER,
  FETCH_CUSTOMERS,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER
} from "./types";

export const fetchUser = () => async dispatch => {
  const response = await log.get("/current_user");
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const createCustomer = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await customers.post("/", {
    ...formValues,
    userId
  });
  dispatch({ type: CREATE_CUSTOMER, payload: response.data });

  // Do some programmatic navigation to
  // get the user back to the root route
  history.push("/");
};

export const fetchCustomers = () => async dispatch => {
  const response = await customers.get("/");
  dispatch({ type: FETCH_CUSTOMERS, payload: response.data });
};

export const fetchCustomer = id => async dispatch => {
  const response = await customers.get(`/${id}`);
  dispatch({ type: FETCH_CUSTOMER, payload: response.data });
};

export const deleteCustomer = id => async dispatch => {
  await customers.delete(`/${id}`);
  dispatch({ type: DELETE_CUSTOMER, payload: id });
  history.push("/");
};

export const editCustomer = (id, formValues) => async dispatch => {
  // using put will update ALL the values patch is part of
  const response = await customers.patch(`/${id}`, formValues);
  dispatch({ type: EDIT_CUSTOMER, payload: response.data });
  history.push("/");
};

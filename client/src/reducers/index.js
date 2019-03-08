import { combineReducers } from "redux";
//import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
//import customersReducer from "./customersReducer";

export default combineReducers({
  auth: authReducer
  //form: reduxForm,
  //customers: customersReducer
});

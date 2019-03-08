import { combineReducers } from "redux";
//import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import customerReducer from "./customerReducer";

export default combineReducers({
  auth: authReducer,
  //form: reduxForm,
  customers: customerReducer
});

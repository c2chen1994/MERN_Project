import React from "react";
import { connect } from "react-redux";
import { createCustomer } from "../../actions";
import CustomerForm from "./CustomerForm";

class CustomerCreate extends React.Component {
  onSumbit = formValues => {
    // preventDefault: redux-form does for us
    this.props.createCustomer(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Customer</h3>
        <CustomerForm onSubmit={this.onSumbit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createCustomer }
)(CustomerCreate);

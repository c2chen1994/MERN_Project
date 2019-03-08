import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchCustomer, editCustomer } from "../../actions";
import CustomerForm from "./CustomerForm";

class CustomerEdit extends React.Component {
  componentDidMount() {
    // show up does depend on the other components
    this.props.fetchCustomer(this.props.match.params.id);
  }

  onSumbit = formValues => {
    this.props.editCustomer(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.customer) return null;
    return (
      <div>
        <h3>Edit a Customer</h3>
        <CustomerForm
          initialValues={_.pick(
            this.props.customer,
            "firstName",
            "lastName",
            "sex",
            "age",
            "email"
          )}
          onSubmit={this.onSumbit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { customer: state.customers[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchCustomer, editCustomer }
)(CustomerEdit);

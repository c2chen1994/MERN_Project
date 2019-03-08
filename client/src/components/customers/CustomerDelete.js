import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCustomer, fetchCustomer, fetchCustomers } from "../../actions";

class CustomerDelete extends React.Component {
  componentDidMount() {
    this.props.fetchCustomer(this.props.match.params.id);
  }

  renderActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteCustomer(this.props.match.params.id)}
          className="ui negative button"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  renderContent = () => {
    if (!this.props.customer)
      return "Are you sure you want to delete this customer?";
    return `Are you sure you want to delete this customer: ${
      this.props.customer.lastName
    } ${this.props.customer.firstName}?`;
  };
  render() {
    return (
      <Modal
        title="Delete Customer"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { customer: state.customers[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { deleteCustomer, fetchCustomer, fetchCustomers }
)(CustomerDelete);

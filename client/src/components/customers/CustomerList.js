import React from "react";
import { connect } from "react-redux";
import { fetchCustomers } from "../../actions";
import { Link } from "react-router-dom";

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: "",
      isSelf: false,
      isReverse: false,
      selectedCustomers: null,
      searchCustomers: []
    };
  }

  componentDidMount() {
    this.props.fetchCustomers();
  }

  handleToggleInputChange = event => {
    const key = this.state.keyWord;

    if (!this.state.isSelf) {
      const sCustomers = this.props.customers.filter(
        customer => this.props.currentUserId === customer.userId
      );

      this.setState({
        isSelf: true,
        selectedCustomers: sCustomers,
        searchCustomers: sCustomers.filter(
          ({ firstName, lastName, email }) =>
            lastName.toLowerCase().indexOf(key) > -1 ||
            email.toLowerCase().indexOf(key) > -1 ||
            firstName.toLowerCase().indexOf(key) > -1
        )
      });
    } else {
      this.setState({
        isSelf: false,
        selectedCustomers: this.props.customers,
        searchCustomers: this.props.customers.filter(
          ({ firstName, lastName, email }) =>
            lastName.toLowerCase().indexOf(key) > -1 ||
            email.toLowerCase().indexOf(key) > -1 ||
            firstName.toLowerCase().indexOf(key) > -1
        )
      });
    }
  };

  handleCheckInputChange = event => {
    if (!this.state.isReverse) {
      this.setState({
        isReverse: true,
        selectedCustomers: [
          ...(this.state.selectedCustomers === null
            ? this.props.customers
            : this.state.selectedCustomers)
        ].reverse(),
        searchCustomers: [...this.state.searchCustomers].reverse()
      });
    } else {
      this.setState({
        isSelf: false,
        selectedCustomers: [...this.state.selectedCustomers].reverse(),
        searchCustomers: [...this.state.searchCustomers].reverse()
      });
    }
    this.props.customers.reverse();
  };

  handleTextInputChange = event => {
    const key = event.target.value.trim().toLowerCase();
    if (key.length > 0) {
      this.setState({
        keyWord: key,
        searchCustomers: (this.state.selectedCustomers !== null
          ? this.state.selectedCustomers
          : this.props.customers
        ).filter(
          ({ firstName, lastName, email }) =>
            lastName.toLowerCase().indexOf(key) > -1 ||
            email.toLowerCase().indexOf(key) > -1 ||
            firstName.toLowerCase().indexOf(key) > -1
        )
      });
    } else {
      this.setState({ keyWord: key, searchCustomers: [] });
    }
  };

  renderAdmin(customer) {
    if (customer.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link
            to={`/customers/edit/${customer._id}`}
            className="ui button primary"
          >
            Edit
            <i className="middle aligned icon edit right floated " />
          </Link>
          <Link
            to={`/customers/delete/${customer._id}`}
            className="ui button negative"
          >
            Delete
            <i className="middle aligned icon trash alternate right floated " />
          </Link>
        </div>
      );
    }
  }

  renderList = () => {
    return (this.state.keyWord.length > 0
      ? this.state.searchCustomers
      : this.state.selectedCustomers === null
      ? this.props.customers
      : this.state.selectedCustomers
    ).map(customer => {
      return (
        <div className="item" key={customer._id}>
          {this.renderAdmin(customer)}
          <i
            className={`large middle aligned icon ${
              customer.sex === "Male" ? "male" : "female"
            }`}
          />
          <div className="content">
            <Link to={`/customers/${customer._id}`}>
              {customer.lastName + " " + customer.firstName}
            </Link>
            <div className="description">{customer.email}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/customers/new" className="ui button primary">
            Create Customer
            <i className="middle aligned icon plus right floated " />
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <h2>Customers:</h2>
        <div className="ui toggle checkbox">
          <input type="checkbox" onChange={this.handleToggleInputChange} />
          <label>Only show customers that you created</label>
        </div>
        <br />
        <div className="ui checkbox">
          <input type="checkbox" onChange={this.handleCheckInputChange} />
          <label>Reverse Sort</label>
        </div>
        <br />
        <br />
        <div className="ui transparent input">
          <input
            onChange={this.handleTextInputChange}
            //value={this.state.keyWord}
            type="text"
            placeholder="Search..."
          />
        </div>
        <br />
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: Object.values(state.customers).sort((c1, c2) => {
      if (c1.lastName.toLowerCase() > c2.lastName.toLowerCase()) return 1;
      if (c1.lastName.toLowerCase() < c2.lastName.toLowerCase()) return -1;
      if (c1.firstName.toLowerCase() > c2.firstName.toLowerCase()) return 1;
      if (c1.firstName.toLowerCase() < c2.firstName.toLowerCase()) return -1;
      return 0;
    }),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchCustomers }
)(CustomerList);

import React from "react";
import { connect } from "react-redux";
import { fetchCustomers } from "../../actions";
import { Link } from "react-router-dom";
import Domain from "../../Domain";

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
    const kw = this.state.keyWord;
    return (this.state.keyWord.length > 0
      ? this.state.searchCustomers
      : this.state.selectedCustomers === null
      ? this.props.customers
      : this.state.selectedCustomers
    ).map(customer => {
      const { _id, sex, lastName, firstName, email, imageId } = customer;
      const startFM = kw.length > 0 ? firstName.toLowerCase().indexOf(kw) : -1;
      const startLM = kw.length > 0 ? lastName.toLowerCase().indexOf(kw) : -1;
      const startE = kw.length > 0 ? email.toLowerCase().indexOf(kw) : -1;
      return (
        <div className="item" key={_id}>
          {this.renderAdmin(customer)}
          {imageId == null ? (
            <img
              className="ui avatar image"
              src={`./${sex.toLowerCase()}.png`}
              alt="avatar"
            />
          ) : (
            <img
              className="ui avatar image"
              src={`${Domain}/api/customers/image/${imageId}`}
              alt="avatar"
            />
          )}

          <div className="content">
            <Link to={`/customers/${_id}`}>
              {startLM < 0 ? (
                <span>{lastName} </span>
              ) : (
                <span>
                  {lastName.substr(0, startLM)}
                  <span style={{ backgroundColor: "yellow" }}>
                    {lastName.substr(startLM, kw.length)}
                  </span>
                  {lastName.substr(startLM + kw.length)}
                  <span> </span>
                </span>
              )}

              {startFM < 0 ? (
                <span>{firstName} </span>
              ) : (
                <span>
                  {firstName.substr(0, startFM)}
                  <span style={{ backgroundColor: "yellow" }}>
                    {firstName.substr(startFM, kw.length)}
                  </span>
                  {firstName.substr(startFM + kw.length)}
                </span>
              )}
            </Link>
            <div className="description">
              <Link to={`/customers/contact/${_id}`} target="_blank">
                {startE < 0 ? (
                  <span>{email} </span>
                ) : (
                  <span>
                    {email.substr(0, startE)}
                    <span style={{ backgroundColor: "yellow" }}>
                      {email.substr(startE, kw.length)}
                    </span>
                    {email.substr(startE + kw.length)}
                  </span>
                )}
              </Link>
            </div>
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
  renderSearchSortArea() {
    return (
      <div className="ui grid">
        <div className="six wide column">
          <div className="ui transparent input">
            <input
              onChange={this.handleTextInputChange}
              //value={this.state.keyWord}
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="six wide column">
          <div className="ui toggle checkbox">
            <input type="checkbox" onChange={this.handleToggleInputChange} />
            <label>Only show customers that you created</label>
          </div>
        </div>
        <div className="three wide column">
          <div className="ui checkbox">
            <input type="checkbox" onChange={this.handleCheckInputChange} />
            <label>Reverse Sort</label>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderSearchSortArea()}
        <h2>Customers:</h2>
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

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
      selectedCustomers: null
    };
  }

  componentDidMount() {
    this.props.fetchCustomers();
  }

  handleChange = event => {
    console.log(this.state);
    let r = this.state.isReverse;
    let f = this.state.isSelf;
    let key = this.state.keyWord;

    if (event.target.type === "checkbox" && event.target.value === "r") r = !r;
    else if (event.target.type === "checkbox" && event.target.value === "f")
      f = !f;
    else key = event.target.value.trim().toLowerCase();

    const reversed = r
      ? [...this.props.customers.reverse()]
      : [...this.props.customers];

    const filtered = f
      ? reversed.filter(
          customer => this.props.currentUserId === customer.userId
        )
      : [...reversed];

    const selected =
      key.length > 0
        ? filtered.filter(
            ({ firstName, lastName, email }) =>
              lastName.toLowerCase().indexOf(key) > -1 ||
              email.toLowerCase().indexOf(key) > -1 ||
              firstName.toLowerCase().indexOf(key) > -1
          )
        : [...filtered];

    this.setState({
      isReverse: r,
      isSelf: f,
      keyWord: key,
      selectedCustomers: selected
    });
    if (r) this.props.customers.reverse();
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
    return (this.state.selectedCustomers == null
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
              onChange={this.handleChange}
              //value={this.state.keyWord}
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="six wide column">
          <div className="ui toggle checkbox">
            <input type="checkbox" onChange={this.handleChange} value="f" />
            <label>Only show customers that you created</label>
          </div>
        </div>
        <div className="three wide column">
          <div className="ui checkbox">
            <input type="checkbox" onChange={this.handleChange} value="r" />
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

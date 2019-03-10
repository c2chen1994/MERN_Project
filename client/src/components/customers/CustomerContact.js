import React from "react";
import { connect } from "react-redux";
import { fetchCustomer } from "../../actions";

class CustomerContact extends React.Component {
  state = {
    title: "",
    content: ""
  };
  componentDidMount() {
    this.props.fetchCustomer(this.props.match.params.id);
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleContentChange = event => {
    this.setState({ content: event.target.value });
  };

  renderForm() {
    return (
      <form className="ui form">
        <div class="field">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title..."
            onChange={this.handleTitleChange}
          />
        </div>
        <div className="field">
          <label>Content:</label>
          <textarea
            rows="2"
            name="content"
            placeholder="Content..."
            onChange={this.handleContentChange}
          />
        </div>

        <a
          href={`mailto:${this.props.customer.email}?subject=${
            this.state.title
          }&body=${this.state.content}`}
        >
          Send Email
        </a>
      </form>
    );
  }

  render() {
    if (this.props.customer == null) return null;
    return (
      <div>
        <div className="header">
          <h2>
            Send an email to customer {this.props.customer.lastName}{" "}
            {this.props.customer.firstName}:
          </h2>
          <br />
        </div>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { customer: state.customers[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchCustomer }
)(CustomerContact);

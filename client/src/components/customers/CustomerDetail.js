import React from "react";
import { connect } from "react-redux";
import { fetchCustomer } from "../../actions";
import faker from "faker";
import Domain from "../../Domain";

class CustomerDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCustomer(id);
  }

  renderCard = () => {
    const {
      lastName,
      firstName,
      sex,
      age,
      email,
      position,
      joinedTime,
      description,
      isMarried,
      imageId
    } = this.props.customer;
    return (
      <div className="card">
        <div className="image">
          <img
            alt="avatar"
            src={
              imageId == null
                ? faker.image.avatar()
                : `${Domain}/api/customers/image/${imageId}`
            }
          />
        </div>
        <div className="content">
          <div className="header">
            {lastName + " " + firstName}

            <i
              className={`middle aligned icon right floated ${
                sex === "Male" ? "mars" : "venus"
              }`}
            />
            <span className="right floated">{`${age}     ${
              isMarried ? "Married" : "Single"
            }`}</span>
          </div>

          <div className="meta">
            <span className="date">{email}</span>
          </div>

          <div className="description">{description}</div>
        </div>

        <div className="extra content">
          <span className="right floated">{`Joined in ${new Date(
            joinedTime
          ).getFullYear()}`}</span>
          <span>
            <i className="user icon" />
            {position}
          </span>
        </div>
      </div>
    );
  };

  render() {
    if (!this.props.customer) return <div>Loading...</div>;
    return <div className="ui link cards">{this.renderCard()}</div>;
  }
}

const mapsStateToProps = (state, ownProps) => {
  return { customer: state.customers[ownProps.match.params.id] };
};

export default connect(
  mapsStateToProps,
  { fetchCustomer }
)(CustomerDetail);

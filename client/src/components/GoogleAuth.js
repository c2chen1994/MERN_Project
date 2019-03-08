import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderContent() {
    switch (this.props.isSignedIn) {
      case null:
        return;
      case false:
        return (
          <a href="/auth/google">
            <button className="ui red goole button">
              <i className="google icon" />
              Sign In With Google
            </button>
          </a>
        );
      default:
        return (
          <a href="/api/logout">
            <button className="ui red goole button">
              <i className="google icon" />
              Sign Out
            </button>
          </a>
        );
    }
  }

  render() {
    return <div> {this.renderContent()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(GoogleAuth);

/*
const GoogleAuth = () => {
  return (
    <Link to="/auth/google">
      <button className="ui red goole button">
        <i className="google icon" />
        Sign In With Google
      </button>
    </Link>
  );
};

export default GoogleAuth;
*/

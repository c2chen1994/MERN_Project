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
          <div className="ui simple dropdown item">
            Sign in with:
            <i className="dropdown icon" />
            <div className="menu" style={{ marginTop: "0px" }}>
              <a href="/auth/google" className="item">
                <i className="google icon" />
                Google
              </a>
              <a href="/auth/github" className="item">
                <i className="github icon" />
                Github
              </a>
              <a href="/auth/facebook" className="item">
                <i className="facebook icon" />
                Facebook
              </a>
              <a href="/auth/twitter" className="item">
                <i className="twitter icon" />
                twitter
              </a>
              <a href="/auth/linkedin" className="item">
                <i className="linkedin icon" />
                Linkedin
              </a>
            </div>
          </div>
        );
      default:
        return (
          <a href="/api/logout">
            <button className="ui red goole button">Sign Out</button>
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

import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui inverted segment">
      <div className="ui container">
        <div className="ui inverted secondary menu">
          <div className="item">
            <Link to="/" className="item">
              <i className="large home icon app-icon" />
              Home
            </Link>
          </div>
          <div className="right item">
            <GoogleAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

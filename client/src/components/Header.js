import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <div className="left menu">
        <div className="ui header ">
          <Link to="/" className="item">
            <i className="large aligned icon node right floated " />
            <i className="large aligned icon copyright left floated" /> by ZHUO
          </Link>
        </div>
      </div>
      <div className="right menu">
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <div className="ui inverted vertical footer segment form-page">
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column" />
          <div className="one one column">
            <i className="large icon node" />
          </div>

          <div className="three wide column">
            <i className="large icon copyright left floated" />
            {new Date().getFullYear()} <span> Zhuo Chen</span>
          </div>

          <div className="two wide column">
            <Link to="/contactMe" target="_blank">
              Contact Me
            </Link>
          </div>
          <div className="one wide column">
            <a
              href="https://www.linkedin.com/in/zhuo-chen-60153814b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="large aligned icon linkedin" />
            </a>
          </div>
          <div className="one wide column">
            <a
              href="https://github.com/c2chen1994"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="large aligned icon github" />
            </a>
          </div>
          <div className="four wide column" />

          <br />
        </div>
      </div>
    </div>
  );
};

export default FooterPage;

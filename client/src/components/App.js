import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CustomerList from "./customers/CustomerList";
import CustomerDelete from "./customers/CustomerDelete";
import CustomerCreate from "./customers/CustomerCreate";
import CustomerEdit from "./customers/CustomerEdit";
import CustomerDetail from "./customers/CustomerDetail";
import CustomerContact from "./customers/CustomerContact";
import AuthorContact from "./AuthorContact";

import history from "../history";

const App = () => {
  return (
    <div className="ui container" style={{ marginTop: "20px" }}>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            {/* Switch is used for unique of /new and /:id */}
            <Route path="/" exact component={CustomerList} />
            <Route path="/customers/new" exact component={CustomerCreate} />
            <Route path="/customers/edit/:id" exact component={CustomerEdit} />
            <Route
              path="/customers/delete/:id"
              exact
              component={CustomerDelete}
            />
            <Route path="/customers/:id" exact component={CustomerDetail} />
            <Route path="/contactMe" exact component={AuthorContact} />
            <Route
              path="/customers/contact/:id"
              exact
              component={CustomerContact}
            />
          </Switch>
          <br />
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;

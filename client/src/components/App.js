import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import CustomerList from "./customers/CustomerList";
import CustomerDelete from "./customers/CustomerDelete";

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
            {/* <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} /> */}
            <Route
              path="/customers/delete/:id"
              exact
              component={CustomerDelete}
            />
            {/* <Route path="/streams/:id" exact component={StreamShow} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;

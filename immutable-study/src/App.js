import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import ReduxDemo from "@/pages/redux";
import ImmutableDemo from "@/pages/immutable";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/immutable" component={ImmutableDemo} />
          <Route path="/" component={ReduxDemo}  exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

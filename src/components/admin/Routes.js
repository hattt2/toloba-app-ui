import React from "react";
import { Route, Switch } from "react-router-dom";

// component imports
import AdminDashboard from "./dashboard/Dashboard";
import Users from "./users/Users";
import Events from "./events/Events";
import Permissions from "./permissions/Permissions";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/admin" component={AdminDashboard} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/events" component={Events} />
        <Route path="/admin/permissions" component={Permissions} />
      </Switch>
    );
  }
}

export default Routes;

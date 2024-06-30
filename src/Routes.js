import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// component imports
import NotFound from "./components/shared/NotFound";
import PrivateRoute from "./components/shared/PrivateRoute";
import EmbeddableForm from "./components/shared/EmbeddableForm";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import MagicLinkPage from "./components/login/MagicLinkPage";
import Dashboard from "./components/dashboard/Dashboard";
import EventDetails from "./components/events/EventDetails";
import EditProfile from "./components/profile/EditProfile";
import Admin from "./components/admin/Admin";
import AdminRoute from "./components/admin/AdminRoute";
import Utilities from "./components/utilities/Utilities";
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/itslogin" component={LoginPage} />
        <Route exact path="/magiclink" component={MagicLinkPage} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Redirect exact path="/live" to="/dashboard" />
        <PrivateRoute path="/profile" component={EditProfile} />
        <AdminRoute path="/admin" component={Admin} />
        <PrivateRoute path="/live/:eventId" component={EventDetails} />
        <PrivateRoute
          path="/forms/:provider/:formId"
          component={EmbeddableForm}
        />
        <PrivateRoute exact path="/utility" component={Utilities} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;

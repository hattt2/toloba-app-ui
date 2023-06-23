import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBToastContainer } from "mdbreact";

// service imports
import httpService from "./services/httpService";
import authService from "./services/authService";

// route imports
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

// store imports
import { fetchProfile } from "./store/users/UsersThunk";
import { selectCurrentUser } from "./store/auth/AuthSelector";
import { fetchRoles } from "./store/auth/AuthThunk";

class App extends Component {
  componentDidMount() {
    httpService.setJwt(authService.getJwt());

    if (this.props.currentUser) {
      this.props.fetchProfile();
      this.props.fetchRoles();
    }

    document.oncontextmenu = function () {
      return false;
    };
  }

  render() {
    return (
      <>
        <MDBToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router>
          <Routes />
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = () => ({
  fetchProfile,
  fetchRoles,
});

export default connect(mapStateToProps, mapDispatchToProps())(App);

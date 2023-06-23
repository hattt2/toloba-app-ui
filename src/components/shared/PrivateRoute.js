import React from "react";
import { Route, Redirect } from "react-router-dom";

// component imports
import Cover from "./Cover";
import Footer from "./Footer";
import Navbar from "./Navbar";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/AuthSelector";
import { logout } from "../../store/auth/AuthThunk";

const SEMI_PRIVATE_ROUTES = [
  "/live/:eventId",
  "/forms/:provider/:formId",
  "/utility",
];

export default function PrivateRoute({ component: Component, path, ...rest }) {
  // store
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  function checkForProfileVerification() {
    if (currentUser) {
      const profileVerified = currentUser.createdAt !== currentUser.updatedAt;

      if (!profileVerified && path !== "/profile")
        return <Redirect to="/profile" />;
    }

    return "";
  }

  function hasAccess() {
    if (currentUser) return true;
    if (SEMI_PRIVATE_ROUTES.includes(path)) return true;
    return false;
  }

  if (!hasAccess()) {
    dispatch(logout());
    return "";
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div className="flyout">
            <Navbar></Navbar>

            <main>
              <>
                {/* {checkForProfileVerification()} */}
                <Cover></Cover>
                <Component {...props} />
              </>
            </main>

            <Footer></Footer>
          </div>
        );
      }}
    ></Route>
  );
}

import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { MDBFooter, MDBSpinner } from "mdbreact";

// component imports
import Navbar from "./Navbar";
import SideNav from "./SideNav";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/AuthSelector";
import { hasAdminAccess } from "../../store/users/admin/UsersAdminSelector";
import { logout } from "../../store/auth/AuthThunk";

// constants
const APP_SHORT_NAME = process.env.REACT_APP_SHORT_NAME;

export default function AdminRoute({ component: Component, ...rest }) {
  // store
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const adminAccess = useSelector(hasAdminAccess);

  // local state
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  const handleToggle = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  if (!currentUser) {
    dispatch(logout());
    return "";
  }

  if (!adminAccess) return <Redirect to="/dashboard" />;

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div>
            <Navbar handleToggle={handleToggle}></Navbar>

            {!currentUser ? (
              <div className="pageLoader">
                <MDBSpinner />
              </div>
            ) : (
              <>
                <SideNav isOpen={isSideNavOpen}></SideNav>

                <main style={{ marginTop: "5rem" }}>
                  <Component {...props} />
                </main>

                <MDBFooter className="fixed-bottom admin-content">
                  <p className="footer-copyright mb-0 py-3 text-center">
                    &copy; {new Date().getFullYear()} {APP_SHORT_NAME}
                  </p>
                </MDBFooter>
              </>
            )}
          </div>
        );
      }}
    ></Route>
  );
}

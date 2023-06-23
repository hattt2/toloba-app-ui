import React from "react";
import { Link } from "react-router-dom";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBToast,
  MDBProgress,
} from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/AuthSelector";
import { hasAdminAccess } from "../../store/users/admin/UsersAdminSelector";
import { getLoadStatus, getTotalRequest } from "../../store/LoadingSlice";
import { logout } from "../../store/auth/AuthThunk";

// assets imports
import logo from "../../assets/logo.png";

// constants
const APP_SHORT_NAME = process.env.REACT_APP_SHORT_NAME;

export default function Navbar() {
  // store
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const loadStatus = useSelector(getLoadStatus);
  const totalRequest = useSelector(getTotalRequest);
  const adminAccess = useSelector(hasAdminAccess);

  function handleLogout() {
    try {
      dispatch(logout());
    } catch {
      MDBToast.error("Unable to logout");
    }
  }

  return (
    <div style={{ marginBottom: "4rem" }}>
      <MDBNavbar
        color="default-color-dark"
        dark
        expand="md"
        fixed="top"
        scrolling
      >
        <MDBNavbarBrand href="/dashboard" className="py-0 font-weight-bold">
          <img
            src={logo}
            alt={APP_SHORT_NAME}
            style={{ height: "2.5rem", width: "2.5rem" }}
          />
          &nbsp;
          <strong className="align-middle">{APP_SHORT_NAME}</strong>
        </MDBNavbarBrand>

        {currentUser && (
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" className="mr-1" />
                  &nbsp;
                  {currentUser.namePrefix
                    ? `${currentUser.namePrefix} ${currentUser.firstName}`
                    : currentUser.firstName || currentUser.itsNumber}
                </MDBDropdownToggle>

                <MDBDropdownMenu className="dropdown-default" right>
                  {adminAccess && (
                    <MDBDropdownItem>
                      <Link to="/admin/users">
                        <MDBIcon icon="lock" className="mr-1" /> Admin Dashboard
                      </Link>
                    </MDBDropdownItem>
                  )}

                  <MDBDropdownItem>
                    <Link to="/profile">
                      <MDBIcon icon="user-edit" className="mr-1" />
                      Edit Profile
                    </Link>
                  </MDBDropdownItem>

                  <MDBDropdownItem divider />

                  <MDBDropdownItem>
                    <Link to="#" onClick={handleLogout}>
                      <MDBIcon icon="sign-out-alt" className="mr-1" />
                      Logout
                    </Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        )}

        {totalRequest - loadStatus > 0 && (
          <div className="progress-container">
            <MDBProgress material preloader color="success" />
          </div>
        )}
      </MDBNavbar>
    </div>
  );
}

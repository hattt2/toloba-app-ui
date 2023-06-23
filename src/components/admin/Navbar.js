import React from "react";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBLink,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBProgress,
  MDBToast,
} from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/AuthSelector";
import { getLoadStatus, getTotalRequest } from "../../store/LoadingSlice";
import { logout } from "../../store/auth/AuthThunk";

export default function Navbar({ handleToggle }) {
  // store
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const loadStatus = useSelector(getLoadStatus);
  const totalRequest = useSelector(getTotalRequest);

  function handleLogout() {
    try {
      dispatch(logout());
    } catch {
      MDBToast.error("Unable to logout");
    }
  }

  return (
    <div style={{ marginBottom: "4rem" }}>
      <MDBNavbar expand="md" fixed="top" scrolling>
        <MDBNavbarToggler
          className="navbar-light"
          onClick={handleToggle}
        ></MDBNavbarToggler>

        {currentUser && (
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" className="mr-2" />
                  {currentUser.namePrefix
                    ? `${currentUser.namePrefix} ${currentUser.firstName}`
                    : currentUser.firstName || currentUser.itsNumber}
                </MDBDropdownToggle>

                <MDBDropdownMenu right>
                  <MDBDropdownItem tag={MDBLink} to="/dashboard">
                    <MDBIcon icon="home" className="mr-1" />
                    Dashboard
                  </MDBDropdownItem>

                  <MDBDropdownItem tag={MDBLink} to="/profile">
                    <MDBIcon icon="user-edit" className="mr-1" />
                    Edit Profile
                  </MDBDropdownItem>

                  <MDBDropdownItem divider />

                  <MDBDropdownItem tag={MDBLink} to="#" onClick={handleLogout}>
                    <MDBIcon icon="sign-out-alt" className="mr-1" />
                    Logout
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        )}

        {totalRequest - loadStatus > 0 && (
          <div className="progress-container">
            <MDBProgress material preloader color="primary" />
          </div>
        )}
      </MDBNavbar>
    </div>
  );
}

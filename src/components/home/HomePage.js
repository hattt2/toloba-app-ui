import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBNavbar,
  MDBNavbarBrand,
  MDBMask,
  MDBView,
  MDBAnimation,
  MDBCard,
  MDBCardBody,
  MDBToastContainer,
} from "mdbreact";

// store imports
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/AuthSelector";

// CSS imports
import "./HomePage.css";

// service imports
import assetsService from "../../services/assetsService";

// constants
const APP_SHORT_NAME = process.env.REACT_APP_SHORT_NAME;
const JAMAAT_NAME = process.env.REACT_APP_JAMAAT_NAME;
const APP_LOGO_NAME = process.env.REACT_APP_LOGO_NAME;

export default function HomePage() {
  const logo = assetsService.getSrcUrl(APP_LOGO_NAME);

  // store
  const currentUser = useSelector(selectCurrentUser);

  // route
  const redirectUrl = useQuery().get("redirect_to");

  useEffect(() => {
    if (currentUser) window.location = redirectUrl || "/dashboard";
  }, [currentUser, redirectUrl]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const renderNavbar = () => {
    return (
      <MDBNavbar
        color="primary-color"
        dark
        expand="md"
        fixed="top"
        scrolling
        transparent
      >
        <MDBContainer>
          <MDBNavbarBrand>
            <img
              src={logo}
              alt={APP_SHORT_NAME}
              style={{ height: "2.5rem", width: "2.5rem" }}
            />
            &nbsp;
            <strong className="white-text">{APP_SHORT_NAME}</strong>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    );
  };

  const renderInfo = () => {
    return (
      <MDBContainer>
        <MDBRow center>
          <MDBCol md="6" xl="5">
            <MDBAnimation type="fadeInRight" delay=".3s">
              <MDBCard id="classic-card">
                <MDBCardBody className="white-text">
                  This is an official website of {JAMAAT_NAME}
                </MDBCardBody>
              </MDBCard>
            </MDBAnimation>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };

  return (
    <div id="apppage">
      {renderNavbar()}

      <MDBToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />

      <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
          {renderInfo()}
        </MDBMask>
      </MDBView>
    </div>
  );
}

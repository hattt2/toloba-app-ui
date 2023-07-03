import React, { useEffect, useState } from "react";
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
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBToastContainer,
} from "mdbreact";

// store imports
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/auth/AuthSelector";
import { login } from "../../store/auth/AuthThunk";

// CSS imports
import "./HomePage.css";

// service imports
import assetsService from "../../services/assetsService";

// constants
const APP_SHORT_NAME = process.env.REACT_APP_SHORT_NAME;
const JAMAAT_NAME = process.env.REACT_APP_JAMAAT_NAME;
const DEFAULT_PASSWORD = process.env.REACT_APP_DEFAULT_PASSWORD;
const APP_LOGO_NAME = process.env.REACT_APP_LOGO_NAME;

export default function HomePage() {
  const logo = assetsService.getSrcUrl(APP_LOGO_NAME);

  // store
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const authStatus = useSelector((state) => state.auth.status);

  // local state
  const [itsNumber, setItsNumber] = useState(null);
  const [password, setPassword] = useState(null);

  // route
  const redirectUrl = useQuery().get("redirect_to");

  useEffect(() => {
    if (currentUser) window.location = redirectUrl || "/dashboard";
  }, [currentUser, redirectUrl]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    // if form is valid then save and proceed
    if (event.target.checkValidity()) {
      dispatch(login({ itsNumber, password }));
    }
  };

  const handleItsInput = (itsNumber) => {
    if (itsNumber.length === 8) {
      setItsNumber(itsNumber);
    } else {
      setItsNumber(null);
    }
  };

  const handlePasswordInput = (password) => {
    setPassword(password);
  };

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

  const renderLoginForm = () => {
    return (
      <MDBContainer>
        <MDBRow center>
          <MDBCol md="6" xl="5">
            <MDBAnimation type="fadeInRight" delay=".3s">
              <MDBCard id="classic-card">
                <MDBCardBody className="white-text">
                  <h3 className="text-center">{JAMAAT_NAME} Login</h3>
                  <hr className="hr-light" />

                  <form
                    className="needs-validation"
                    noValidate
                    onSubmit={submitHandler}
                  >
                    <MDBInput
                      onInput={(e) => handleItsInput(e.target.value)}
                      label="ITS Number"
                      name="itsNumber"
                      className="white-text"
                      iconClass="white-text"
                      icon="id-card"
                      required
                      maxLength="8"
                      pattern="^\d{8}$"
                    >
                      <div className="invalid-feedback ml-5">
                        Valid 8 digit ITS is required
                      </div>
                    </MDBInput>

                    <MDBInput
                      onInput={(e) => handlePasswordInput(e.target.value)}
                      className="white-text"
                      iconClass="white-text"
                      label="Password"
                      icon="lock"
                      type="password"
                      required
                    >
                      <small id="passwordHelp" className="form-text text-muted">
                        Default password is <strong>{DEFAULT_PASSWORD}</strong>
                      </small>
                      <div className="invalid-feedback ml-5">
                        Password is required
                      </div>
                    </MDBInput>

                    <div className="text-center mt-4 black-text">
                      <MDBBtn
                        disabled={
                          authStatus === "loading" || !itsNumber || !password
                        }
                        color="primary"
                        type="submit"
                      >
                        Login
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBAnimation>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };

  const renderFooter = () => {
    return (
      <MDBContainer>
        <MDBRow className="py-5">
          <MDBCol md="12" className="text-center">
            <h6 className="mb-4">
              We are a squad of enthusiast khidmatguzars who are willing to
              serve <i>Dawoodi Bohra Community</i> under the kind benediction of
              our beloved
              <br />
              <strong>
                Aqa Maula, Syedna Aali Qadr Mufaddal Saifuddin TUS
              </strong>
            </h6>
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
          {renderLoginForm()}
        </MDBMask>
      </MDBView>

      {renderFooter()}
    </div>
  );
}

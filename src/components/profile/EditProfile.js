import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBToast,
  MDBInput,
  MDBBtn,
} from "mdbreact";

// store imports
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/auth/AuthSelector";
import { updateProfile } from "../../store/users/UsersThunk";

export default function EditProfile() {
  // store
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // route
  const history = useHistory();

  // local state
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState(
    currentUser.mobileNumber || ""
  );
  const [whatsappNumber, setWhatsappNumber] = useState(
    currentUser.whatsappNumber || ""
  );

  // local vars
  const profileVerified =
    currentUser && currentUser.createdAt !== currentUser.updatedAt;

  const submitHandler = async (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    // if form is valid then save and proceed
    if (event.target.checkValidity()) {
      if (password !== confirmPassword)
        return MDBToast.error("Password & Confirm Password do not match");
      setLoading(true);
      updateUserProfile();
      setTimeout(() => {
        history.push("/dashboard");
        setLoading(false);
      }, 3000);
    }
  };

  async function updateUserProfile() {
    const profile = { mobileNumber };
    if (whatsappNumber) profile.whatsappNumber = whatsappNumber;
    if (password) profile.password = password;
    return dispatch(updateProfile({ profile }));
  }

  const handleInput = (e) => {
    switch (e.target.name) {
      case "password":
        setPassword(e.target.value);
        break;
      case "cnfrmPassword":
        setConfirmPassword(e.target.value);
        break;
      case "mobileNumber":
        setMobileNumber(e.target.value);
        break;
      case "whatsappNumber":
        setWhatsappNumber(e.target.value);
        break;
      default:
    }
  };

  return (
    <MDBContainer>
      <MDBRow center>
        <MDBCol md="6">
          <MDBCard style={{ marginBottom: "2rem" }}>
            <MDBCardHeader color="default-color-dark" className="text-center">
              <strong>
                {currentUser.itsNumber} - {currentUser.fullName}
              </strong>
            </MDBCardHeader>

            <MDBCardBody>
              <form
                className="needs-validation"
                noValidate
                onSubmit={submitHandler}
              >
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      onInput={handleInput}
                      label="Mobile Number"
                      type="text"
                      name="mobileNumber"
                      value={mobileNumber}
                      required
                      pattern="^\+91\d{10}$"
                    >
                      <small className="form-text text-muted">
                        +91XXXXXXXXXX
                      </small>
                      <div className="invalid-feedback">
                        Valid mobile number required
                      </div>
                    </MDBInput>
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      onInput={handleInput}
                      label="Whatsapp Number"
                      type="text"
                      name="whatsappNumber"
                      value={whatsappNumber}
                      pattern="^\+91\d{10}$"
                    >
                      <small className="form-text text-muted">
                        Leave blank if same as mobile number
                      </small>
                      <div className="invalid-feedback">
                        Invalid mobile number
                      </div>
                    </MDBInput>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      onInput={handleInput}
                      label="New Password"
                      type="password"
                      name="password"
                      minLength="6"
                      maxLength="8"
                      required={!profileVerified}
                    >
                      {profileVerified && (
                        <small className="form-text text-muted">
                          Leave blank to keep the same
                        </small>
                      )}

                      <div className="invalid-feedback">
                        Length must be 6 to 8 chars
                      </div>
                    </MDBInput>
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      onInput={handleInput}
                      label="Confirm New Password"
                      type="password"
                      name="cnfrmPassword"
                      minLength="6"
                      maxLength="8"
                      required={!profileVerified}
                    >
                      {profileVerified && (
                        <small className="form-text text-muted">
                          Leave blank to keep the same
                        </small>
                      )}

                      <div className="invalid-feedback">
                        Length must be 6 to 8 chars
                      </div>
                    </MDBInput>
                  </MDBCol>
                </MDBRow>

                <MDBContainer className="text-center">
                  <MDBBtn disabled={loading} color="default" type="submit">
                    Save
                  </MDBBtn>
                </MDBContainer>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

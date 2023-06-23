import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBToast,
  MDBInput,
} from "mdbreact";

// store imports
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/users/admin/UsersAdminThunk";

export default function ResetPasswordModal({ user }) {
  // store
  const dispatch = useDispatch();

  // local state
  const [isOpen, setIsOpen] = React.useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    // if form is valid then save and proceed
    if (event.target.checkValidity()) {
      if (password !== confirmPassword) {
        return MDBToast.error("Password & Confirm Password do not match");
      }

      updateUserProfile();
      toggleModal();
    }
  };

  function updateUserProfile() {
    const profile = {
      password,
    };

    dispatch(updateUser({ userId: user._id, profile }));
  }

  const handleInput = (e) => {
    switch (e.target.name) {
      case "password":
        setPassword(e.target.value);
        break;
      case "cnfrmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
    }
  };

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function showButton() {
    return (
      <MDBBtn
        onClick={() => toggleModal()}
        outline
        rounded
        color="primary"
        className="btn btn-sm float-right"
      >
        Reset Password
      </MDBBtn>
    );
  }

  return (
    <>
      {showButton()}

      <MDBModal isOpen={isOpen} toggle={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Reset Password</MDBModalHeader>

        <MDBModalBody>
          Enter 6 to 8 characters long password
          <form
            id="resetPassForm"
            className="needs-validation"
            noValidate
            onSubmit={submitHandler}
          >
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  onInput={handleInput}
                  label="New Password"
                  type="password"
                  name="password"
                  minLength="6"
                  maxLength="8"
                  required={true}
                >
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
                  required={true}
                >
                  <div className="invalid-feedback">
                    Length must be 6 to 8 chars
                  </div>
                </MDBInput>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color="primary" size="md" type="submit" form="resetPassForm">
            Reset Password
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
}

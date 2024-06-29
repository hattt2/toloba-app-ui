import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdbreact";

// store imports
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/users/admin/UsersAdminThunk";

export default function MagicTokenModal({ user }) {
  // store
  const dispatch = useDispatch();

  // local state
  const [isOpen, setIsOpen] = React.useState(false);
  const [magicToken, setMagicToken] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    // if form is valid then save and proceed
    if (event.target.checkValidity()) {
      updateUserProfile();
      toggleModal();
    }
  };

  function updateUserProfile() {
    const profile = {
      magicToken,
    };

    dispatch(updateUser({ userId: user._id, profile }));
  }

  const handleInput = (e) => {
    switch (e.target.name) {
      case "magicToken":
        setMagicToken(e.target.value);
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
        Set Magic Token
      </MDBBtn>
    );
  }

  return (
    <>
      {showButton()}

      <MDBModal isOpen={isOpen} toggle={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Set Magic Token</MDBModalHeader>

        <MDBModalBody>
          Enter 6 to 30 characters long magic token
          <form
            id="magicTokenForm"
            className="needs-validation"
            noValidate
            onSubmit={submitHandler}
          >
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  onInput={handleInput}
                  label="Magic Token"
                  type="magicToken"
                  name="magicToken"
                  minLength="6"
                  maxLength="30"
                  required={true}
                >
                  <div className="invalid-feedback">
                    Length must be 6 to 30 chars
                  </div>
                </MDBInput>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color="primary" size="md" type="submit" form="magicTokenForm">
            Set Magic Token
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
}

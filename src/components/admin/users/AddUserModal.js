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
import { insertUser } from "../../../store/users/admin/UsersAdminThunk";

export default function AddUserModal() {
  // store
  const dispatch = useDispatch();

  // local state
  const [isOpen, setIsOpen] = React.useState(false);
  const [itsNumber, setItsNumber] = useState("");
  const [hofItsNumber, setHofItsNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jamaat, setJamaat] = useState("GUEST");

  const submitHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    // if form is valid then save and proceed
    if (event.target.checkValidity()) {
      addUser();
      toggleModal();
    }
  };

  function addUser() {
    const user = {
      itsNumber,
      hofItsNumber,
      firstName,
      lastName,
      jamaat,
    };

    dispatch(insertUser(user));
  }

  const handleInput = (e) => {
    switch (e.target.name) {
      case "itsNumber":
        setItsNumber(e.target.value);
        break;
      case "hofItsNumber":
        setHofItsNumber(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "jamaat":
        setJamaat(e.target.value);
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
        className="btn btn-sm btn-secondary"
      >
        Add User
      </MDBBtn>
    );
  }

  return (
    <>
      {showButton()}

      <MDBModal isOpen={isOpen} toggle={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Add User</MDBModalHeader>

        <MDBModalBody>
          <form
            id="addUserForm"
            className="needs-validation"
            noValidate
            onSubmit={submitHandler}
          >
            <MDBRow>
              <MDBCol md="4">
                <MDBInput
                  onInput={handleInput}
                  label="ITS Number"
                  type="text"
                  name="itsNumber"
                  required
                  maxLength="8"
                  pattern="^\d{8}$"
                >
                  <div className="invalid-feedback">
                    Valid 8 digit ITS is required
                  </div>
                </MDBInput>
              </MDBCol>

              <MDBCol md="4">
                <MDBInput
                  onInput={handleInput}
                  label="HOF ITS Number"
                  type="text"
                  name="hofItsNumber"
                  required
                  maxLength="8"
                  pattern="^\d{8}$"
                >
                  <div className="invalid-feedback">
                    Valid 8 digit HOF ITS is required
                  </div>
                </MDBInput>
              </MDBCol>

              <MDBCol md="4">
                <MDBInput
                  onInput={handleInput}
                  label="Jamaat"
                  type="text"
                  name="jamaat"
                  minLength="5"
                  required
                  value={jamaat}
                >
                  <div className="invalid-feedback">
                    Length must be 5 characters
                  </div>
                </MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  onInput={handleInput}
                  label="First Name"
                  type="text"
                  name="firstName"
                  required
                ></MDBInput>
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  onInput={handleInput}
                  label="Last Name"
                  type="text"
                  name="lastName"
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color="primary" size="md" type="submit" form="addUserForm">
            Add User
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
}

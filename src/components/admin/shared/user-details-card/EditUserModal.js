import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

export default function EditUserModal({ user, toggleModal, isOpen }) {
  return (
    <MDBModal isOpen={isOpen} toggle={toggleModal}>
      <MDBModalHeader toggle={toggleModal}>Edit Details</MDBModalHeader>

      <MDBModalBody>{user.itsNumber}</MDBModalBody>

      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={toggleModal}>
          Close
        </MDBBtn>

        <MDBBtn color="primary">Save changes</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
}

import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBSelect,
  MDBAlert,
  MDBSwitch,
} from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectRoles,
} from "../../../../store/auth/AuthSelector";
import { hasSuperAdminAccess } from "../../../../store/users/admin/UsersAdminSelector";
import { updateUser } from "../../../../store/users/admin/UsersAdminThunk";

export default function UserPermissionsModal({ user }) {
  // store
  const dispatch = useDispatch();
  const roles = useSelector(selectRoles);
  const currentUser = useSelector(selectCurrentUser);
  const superAdminAccess = useSelector(hasSuperAdminAccess);

  // local state
  const [userRoles, setUserRoles] = useState({ ...user.roles } || {});
  const [superAdmin, setSuperAdmin] = useState(user.superAdmin || false);
  const [isOpen, setIsOpen] = React.useState(false);

  const getAvailableRoles = (module) => {
    const rolesOptions = [
      {
        text: "--NO_ACCESS--",
        value: null,
        checked: !userRoles || !userRoles[module],
      },
    ];

    Object.keys(roles[module]).forEach((role) => {
      rolesOptions.push({
        text: toTitleCase(role),
        value: role,
        checked: userRoles && userRoles[module] === role,
      });
    });

    return rolesOptions;
  };

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
      roles: userRoles,
      superAdmin,
    };

    dispatch(updateUser({ userId: user._id, profile }));
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function showPermissionsButton() {
    if (!superAdminAccess || currentUser.itsNumber === user.itsNumber)
      return "";

    return (
      <MDBBtn
        onClick={() => toggleModal()}
        color="primary"
        rounded
        outline
        className="btn btn-sm float-right"
      >
        Edit Permissions
      </MDBBtn>
    );
  }

  function setRole(module, values) {
    const value = values && values.length ? values[0] : null;
    if (!value) delete userRoles[module];
    userRoles[module] = value;
    setUserRoles(userRoles);
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <>
      {showPermissionsButton()}

      <MDBModal isOpen={isOpen} toggle={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Edit Permissions</MDBModalHeader>

        <MDBModalBody>
          <MDBSwitch
            id="superAdminToggle"
            labelLeft={superAdmin ? "Super Admin" : "Make Super Admin"}
            labelRight=""
            checked={superAdmin}
            getValue={(value) => setSuperAdmin(value)}
          />

          {superAdmin && (
            <MDBAlert color="info">
              <strong>SUPER ADMIN</strong>
              <br />
              Full Access to all the modules
              <br />
              Access to manage permissions
            </MDBAlert>
          )}

          {!superAdmin && (
            <MDBAlert color="info">
              <strong>VIEWER</strong> - View Only Access
              <br />
              <strong>COLLABORATOR</strong> - Can View/Add records
              <br />
              <strong>ADMIN</strong> - Full Access
            </MDBAlert>
          )}

          <form
            id="permissionsForm"
            className="needs-validation"
            noValidate
            onSubmit={submitHandler}
          >
            {!superAdmin &&
              Object.keys(roles).map((module) => {
                return (
                  <MDBSelect
                    key={module}
                    options={getAvailableRoles(module)}
                    selected="Choose Role"
                    label={`${toTitleCase(module)} Module`}
                    getValue={(values) => setRole(module, values)}
                  />
                );
              })}
          </form>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color="primary" type="submit" form="permissionsForm">
            Save
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
}

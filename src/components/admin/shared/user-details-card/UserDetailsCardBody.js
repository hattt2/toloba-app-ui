import React from "react";
import {
  MDBCardBody,
  MDBIcon,
  MDBCardTitle,
  MDBCardText,
  MDBAlert,
  MDBTable,
  MDBTableBody,
} from "mdbreact";

// component imports
import HofDetails from "./HofDetails";

export default function UserDetailsCardBody({
  user,
  showMetaInfo,
  showScreenLimitInfo,
  showPermissionsInfo,
}) {
  function renderMobileNumber(user) {
    return user.mobileNumber ? (
      <>
        <MDBIcon icon="phone" />
        {` ${user.mobileNumber}`}
      </>
    ) : (
      <span className="text-danger">Contact Number Missing</span>
    );
  }

  function renderWhatsappNumber(user) {
    if (!user.whatsappNumber && !user.mobileNumber) return "";

    return (
      <span className="ml-2">
        <MDBIcon fab icon="whatsapp" />
        {` ${user.whatsappNumber || user.mobileNumber}`}
      </span>
    );
  }

  function renderEmail(user) {
    if (user.email)
      return (
        <>
          <MDBIcon icon="envelope-open" />
          {` ${user.email}`}
        </>
      );

    return (
      <>
        |<span className="text-danger ml-2">Email Missing</span>
      </>
    );
  }

  function renderScreenLimitAlert(user) {
    if (user.screenLimit <= 1 || !showScreenLimitInfo) return "";

    return (
      <MDBAlert className="mt-3" color="warning">
        Maximum screen limit is {user.screenLimit}
      </MDBAlert>
    );
  }

  function renderPermissionsInfo(user) {
    if (user.superAdmin)
      return (
        <MDBAlert className="mt-3" color="success">
          <MDBIcon icon="crown" />
          &nbsp; Has super admin access
        </MDBAlert>
      );

    if (user.roles && Object.keys(user.roles).length) {
      let permissionRows = getPermissionRows(user.roles);

      if (permissionRows && permissionRows.length)
        return (
          <>
            <p>
              <strong>
                <MDBIcon icon="key" />
                &nbsp; PERMISSIONS
              </strong>
            </p>
            <MDBTable>
              <MDBTableBody>{permissionRows}</MDBTableBody>
            </MDBTable>
          </>
        );
    }

    return (
      <MDBAlert className="mt-3" color="info">
        Do not have admin access
      </MDBAlert>
    );
  }

  function getPermissionRows(userRoles) {
    const rows = [];

    Object.keys(userRoles).forEach((module) => {
      const permission = userRoles[module];

      if (permission) {
        rows.push(
          <tr key={`${module}-${permission}`}>
            <td>
              <strong>{module}</strong>
            </td>
            <td>{permission}</td>
          </tr>
        );
      }
    });

    return rows;
  }

  return (
    <MDBCardBody>
      <MDBCardTitle tag="h6">
        {user.fullName} - {user.age} yrs
      </MDBCardTitle>

      <MDBCardText>
        {renderMobileNumber(user)}
        {renderWhatsappNumber(user)}
        <br />
        {renderEmail(user)}
      </MDBCardText>

      {renderScreenLimitAlert(user)}
      {showPermissionsInfo && renderPermissionsInfo(user)}

      <HofDetails user={user} showMetaInfo={showMetaInfo}></HofDetails>
    </MDBCardBody>
  );
}

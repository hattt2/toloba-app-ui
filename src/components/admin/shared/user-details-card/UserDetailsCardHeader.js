import React from "react";
import { MDBCardHeader, MDBBadge, MDBIcon } from "mdbreact";

// store imports
import { hasAdminAccess } from "../../../../store/users/admin/UsersAdminSelector";
import { useSelector } from "react-redux";

export default function UserDetailsCardHeader({
  user,
  headerColour = "white",
}) {
  const adminAccess = useSelector((state) => hasAdminAccess(state, user));

  function renderHofBadge(user) {
    if (!user.isHof) return "";

    return (
      <MDBBadge pill color="secondary">
        <MDBIcon icon="crown" />
        {" HOF"}
      </MDBBadge>
    );
  }

  function renderSuperAdminBadge(user) {
    if (!adminAccess) return "";

    return (
      <MDBBadge
        className="ml-1"
        pill
        color={user.superAdmin ? "success" : "warning"}
      >
        {user.superAdmin ? "Super-Admin" : "Module-Rights"}
      </MDBBadge>
    );
  }

  function renderMemberBadge(user) {
    if (!user.member) return "";

    return (
      <MDBBadge className="ml-1" pill color="primary">
        Member
      </MDBBadge>
    );
  }

  return (
    <MDBCardHeader className={headerColour}>
      <span className={headerColour !== "white" ? "white-text" : ""}>
        <strong>{user.itsNumber}</strong>
      </span>

      <span className="float-right">
        {renderHofBadge(user)}
        {renderSuperAdminBadge(user)}
        {renderMemberBadge(user)}
      </span>
    </MDBCardHeader>
  );
}

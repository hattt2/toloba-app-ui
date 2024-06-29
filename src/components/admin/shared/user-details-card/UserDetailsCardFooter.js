import React from "react";
import { MDBCardFooter } from "mdbreact";

// store imports
import { useSelector } from "react-redux";
import { hasPermissionForResource } from "../../../../store/users/admin/UsersAdminSelector";

// component imports
import ResetPasswordModal from "./ResetPasswordModal";
import ScreenLimitPopover from "./ScreenLimitPopover";
import UserPermissionsModal from "./UserPermissionsModal";
import MagicTokenModal from "./MagicTokenModal";

export default function UserDetailsCardFooter({
  user,
  showResetPasswordOption,
  showScreenLimitOption,
  showEditPermissionsOption,
}) {
  // store
  const permissionForUsersEdit = useSelector((state) =>
    hasPermissionForResource(state, "USERS", "EDIT")
  );

  function renderCardFooter() {
    if (!permissionForUsersEdit) return "";

    return (
      <MDBCardFooter>
        {showScreenLimitOption && (
          <ScreenLimitPopover user={user}></ScreenLimitPopover>
        )}

        {showResetPasswordOption && (
          <ResetPasswordModal user={user}></ResetPasswordModal>
        )}

        {showResetPasswordOption && (
          <MagicTokenModal user={user}></MagicTokenModal>
        )}

        {showEditPermissionsOption && (
          <UserPermissionsModal user={user}></UserPermissionsModal>
        )}
      </MDBCardFooter>
    );
  }

  return renderCardFooter();
}

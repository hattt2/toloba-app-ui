import React from "react";
import { MDBCard } from "mdbreact";

// component imports
import UserDetailsCardHeader from "./UserDetailsCardHeader";
import UserDetailsCardFooter from "./UserDetailsCardFooter";
import UserDetailsCardBody from "./UserDetailsCardBody";

export default function UserDetailsCard({
  user,
  showMetaInfo,
  headerColour,
  showScreenLimitInfo,
  showPermissionsInfo,
  showResetPasswordOption,
  showScreenLimitOption,
  showEditPermissionsOption,
}) {
  return (
    <MDBCard className="mt-3">
      <UserDetailsCardHeader
        user={user}
        headerColour={headerColour}
      ></UserDetailsCardHeader>

      <UserDetailsCardBody
        user={user}
        showMetaInfo={showMetaInfo}
        showScreenLimitInfo={showScreenLimitInfo}
        showPermissionsInfo={showPermissionsInfo}
      ></UserDetailsCardBody>

      <UserDetailsCardFooter
        user={user}
        showResetPasswordOption={showResetPasswordOption}
        showScreenLimitOption={showScreenLimitOption}
        showEditPermissionsOption={showEditPermissionsOption}
      ></UserDetailsCardFooter>
    </MDBCard>
  );
}

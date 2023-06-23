import React from "react";

// component imports
import UserDetailsCard from "../shared/user-details-card/UserDetailsCard";

export default function PermissionList({ users }) {
  return (
    <div className="mt-4">
      <strong>{users.length} USER(S) HAVE PERMISSIONS</strong>

      {users?.map((user) => {
        return (
          <UserDetailsCard
            key={user.itsNumber}
            user={user}
            showPermissionsInfo={true}
            showEditPermissionsOption={true}
          ></UserDetailsCard>
        );
      })}
    </div>
  );
}

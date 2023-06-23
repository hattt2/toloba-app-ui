import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer } from "mdbreact";

// CSS imports
import "./Permissions.css";

// component imports
import SearchUser from "../shared/SearchUser";
import PermissionList from "./PermissionList";
import UserDetailsCard from "../shared/user-details-card/UserDetailsCard";

// store imports
import { useSelector, useDispatch } from "react-redux";
import { fetchAdmins } from "../../../store/users/admin/UsersAdminThunk";
import { selectUserById } from "../../../store/users/UsersSelector";
import { selectAdmins } from "../../../store/users/admin/UsersAdminSelector";

export default function Permissions() {
  // local state
  const [selectedUserId, setSelectedUserId] = useState(null);

  // store
  const dispatch = useDispatch();
  const admins = useSelector(selectAdmins);
  const selectedUser = useSelector((state) =>
    selectUserById(state, selectedUserId)
  );

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const onUserSelect = (user) => {
    setSelectedUserId(user?._id);
  };

  return (
    <MDBContainer className="justify-content-center d-flex">
      <MDBCol md="8">
        <MDBContainer className="text-center text-primary mb-4 mt-3">
          <h5>
            <strong>SEARCH TO ADD PERMISSION</strong>
          </h5>
        </MDBContainer>

        <SearchUser onUserSelect={onUserSelect} isClearable={true}></SearchUser>

        {selectedUserId ? (
          <UserDetailsCard
            user={selectedUser}
            showPermissionsInfo={true}
            showEditPermissionsOption={true}
          ></UserDetailsCard>
        ) : (
          <PermissionList users={admins}></PermissionList>
        )}
      </MDBCol>
    </MDBContainer>
  );
}

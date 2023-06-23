import React from "react";
import { Route, useHistory } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";

// component imports
import UploadCsvButton from "./UploadCsvButton";
import SearchUser from "../shared/SearchUser";
import FamilyDetails from "./FamilyDetails";
import UserStats from "./UserStats";

// store imports
import { useSelector } from "react-redux";
import { hasPermissionForResource } from "../../../store/users/admin/UsersAdminSelector";

export default function Users() {
  // store
  const permissionForUsersAdd = useSelector((state) =>
    hasPermissionForResource(state, "USERS", "ADD")
  );

  // route
  const history = useHistory();

  function renderAddOptions() {
    if (!permissionForUsersAdd) return "";

    return (
      <>
        {/* <MDBBtn color="info" className="btn btn-sm">
          Add Guest
        </MDBBtn> */}
        <UploadCsvButton></UploadCsvButton>
      </>
    );
  }

  const onUserSelect = (user) => {
    history.push(`/admin/users/${user.hofItsNumber}`);
  };

  return (
    <MDBContainer>
      <span className="text-center text-primary">
        <h5>
          <strong>EXPLORE JAMAAT DATABASE</strong>
        </h5>
      </span>

      <MDBRow className="mt-4">
        <UserStats></UserStats>
      </MDBRow>

      <MDBRow className="d-flex align-items-center">
        <MDBCol md="8">
          <SearchUser onUserSelect={onUserSelect}></SearchUser>
        </MDBCol>

        <MDBCol>{renderAddOptions()}</MDBCol>
      </MDBRow>

      <MDBRow>
        <Route path="/admin/users/:hofIts" component={FamilyDetails} />
      </MDBRow>
    </MDBContainer>
  );
}

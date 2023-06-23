import React, { useEffect } from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";

// component imports
import UserDetailsCard from "../shared/user-details-card/UserDetailsCard";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { selectUsersByHofIts } from "../../../store/users/admin/UsersAdminSelector";
import { fetchUsersByHofIts } from "../../../store/users/admin/UsersAdminThunk";

export default function FamilyDetails(props) {
  // route
  const { hofIts } = props.match.params;

  // store
  const dispatch = useDispatch();
  const { members, hof } = useSelector((state) =>
    selectUsersByHofIts(state, hofIts)
  );

  useEffect(() => {
    dispatch(fetchUsersByHofIts(hofIts));
  }, [hofIts, dispatch]);

  function renderFamilyDetails() {
    if (!hof) return "";

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="mt-4">
            <h5>HOF Details</h5>
            <UserDetailsCard
              user={hof}
              showMetaInfo={true}
              headerColour="primary-color"
              showScreenLimitInfo={true}
              showResetPasswordOption={true}
              showScreenLimitOption={true}
            ></UserDetailsCard>
          </MDBCol>

          <MDBCol md="6" className="mt-4">
            <h5>{members?.length} Family Members</h5>
            {members?.map((member) => {
              return (
                <UserDetailsCard
                  key={member.itsNumber}
                  user={member}
                  showScreenLimitInfo={true}
                  showResetPasswordOption={true}
                  showScreenLimitOption={true}
                ></UserDetailsCard>
              );
            })}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }

  return renderFamilyDetails();
}

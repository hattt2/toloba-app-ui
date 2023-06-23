import React, { useEffect } from "react";
import { MDBCard, MDBCardImage, MDBCol } from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../../store/users/admin/UsersAdminThunk";

export default function UserStats() {
  // store
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.usersAdmin.stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <>
      <MDBCol className="mb-2 col-4" style={{ paddingRight: "5px" }}>
        <MDBCard>
          <MDBCardImage
            className="text-primary d-flex justify-content-center align-items-center flex-column p-4 rounded"
            tag="div"
          >
            <h2>
              <strong>{stats?.hofCount || 0}</strong>
            </h2>
            <h5>HOFs</h5>
          </MDBCardImage>
        </MDBCard>
      </MDBCol>

      <MDBCol
        className="mb-2 col-4"
        style={{ paddingLeft: "5px", paddingRight: "5px" }}
      >
        <MDBCard>
          <MDBCardImage
            className="text-primary d-flex justify-content-center align-items-center flex-column p-4 rounded"
            tag="div"
          >
            <h2>
              <strong>{stats?.totalCount || 0}</strong>
            </h2>
            <h5>Total</h5>
          </MDBCardImage>
        </MDBCard>
      </MDBCol>

      <MDBCol className="mb-4 col-4" style={{ paddingLeft: "5px" }}>
        <MDBCard>
          <MDBCardImage
            className="text-primary d-flex justify-content-center align-items-center flex-column p-4 rounded"
            tag="div"
          >
            <h2>
              <strong>{stats?.guestCount || 0}</strong>
            </h2>
            <h5>Guests</h5>
          </MDBCardImage>
        </MDBCard>
      </MDBCol>
    </>
  );
}

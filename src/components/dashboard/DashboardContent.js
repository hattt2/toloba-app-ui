import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";

// component imports
import EventList from "../events/EventList";
import Feed from "./Feed";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveFeeds } from "../../store/feeds/FeedsThunk";
import { selectActiveFeeds } from "../../store/feeds/FeedsSelector";

export default function DashboardContent() {
  // store
  const dispatch = useDispatch();
  const feeds = useSelector(selectActiveFeeds);

  useEffect(() => {
    dispatch(fetchActiveFeeds());
  }, [dispatch]);

  function renderFeeds() {
    return feeds.map((feed) => {
      return (
        <MDBCol md="4" key={feed._id}>
          <Feed feed={feed}></Feed>
        </MDBCol>
      );
    });
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12" className="text-center">
          <EventList></EventList>
        </MDBCol>
      </MDBRow>

      <MDBRow>{renderFeeds()}</MDBRow>
    </MDBContainer>
  );
}

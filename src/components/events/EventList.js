import React, { useEffect } from "react";
import {
  MDBAlert,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
} from "mdbreact";

// store imports
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/auth/AuthSelector";
import { fetchAccessibleEvents } from "../../store/events/EventsThunk";
import { selectAccessibleEvents } from "../../store/events/EventsSelector";

// component imports
import EventListItem from "./event-list-item/EventListItem";

export default function EventList() {
  // store
  const dispatch = useDispatch();
  const events = useSelector(selectAccessibleEvents);
  const currentUser = useSelector(selectCurrentUser);
  const eventListStatus = useSelector((state) => state.events.status);

  useEffect(() => {
    dispatch(fetchAccessibleEvents());
  }, [dispatch]);

  function renderEventList() {
    return events.map((event) => (
      <EventListItem
        event={event}
        user={currentUser}
        key={event._id}
      ></EventListItem>
    ));
  }

  if (eventListStatus !== "succeeded") return "";

  if (!events?.length)
    return (
      <MDBCard style={{ marginBottom: "2rem" }}>
        <div className="m-3">
          <MDBAlert color="danger">RAZA NOT GRANTED</MDBAlert>

          <div className="text-primary">
            <MDBIcon icon="info-circle" className="mr-2" /> Contact
            Anjuman-e-Vajihi Office.
          </div>
        </div>
      </MDBCard>
    );

  return (
    <MDBCard style={{ marginBottom: "2rem" }}>
      <MDBCardHeader style={{ backgroundColor: "#036B5F", color: "#fff" }}>
        <strong>LIVE EVENTS</strong>
      </MDBCardHeader>

      <MDBCardBody>{renderEventList()}</MDBCardBody>
    </MDBCard>
  );
}

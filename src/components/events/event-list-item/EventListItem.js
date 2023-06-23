import React from "react";
import { MDBCard, MDBCardBody, MDBCardText } from "mdbreact";

// component imports
import EventLink from "./EventLink";

// CSS imports
import "./EventListItem.css";

export default function EventListItem({ event, user }) {
  function showDesc() {
    return event.desc && <MDBCardText>{event.desc}</MDBCardText>;
  }

  return (
    <MDBCard coverlay="white-slight" className="mb-3 event-list-item hoverable">
      <MDBCardBody>
        <EventLink event={event} user={user}>
          {event.title}
        </EventLink>

        {showDesc()}
      </MDBCardBody>
    </MDBCard>
  );
}

import React from "react";
import { MDBContainer, MDBRow } from "mdbreact";

// component import
import EventTitle from "./EventTitle";
import EventType from "./EventType";
import EventSubscribers from "./EventSubscribers";
import EventViewers from "./EventViewers";
import EventSettingsButton from "./event-settings-button/EventSettingsButton";

export default function EventsMobileView({ event }) {
  return (
    <MDBContainer>
      <MDBRow>
        <strong>
          <EventTitle event={event} />
        </strong>
      </MDBRow>

      <MDBRow className="mt-1 mb-1">
        <EventType event={event} />
        <span className="mr-2 ml-2">|</span>
        <EventViewers event={event} />
      </MDBRow>

      <MDBRow className="d-flex justify-content-between align-items-center">
        <EventSubscribers event={event} />
        <EventSettingsButton event={event} />
      </MDBRow>
    </MDBContainer>
  );
}

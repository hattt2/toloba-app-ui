import React from "react";
import { MDBCol, MDBRow } from "mdbreact";

// component imports
import EventTitle from "./EventTitle";
import EventType from "./EventType";
import EventSubscribers from "./EventSubscribers";
import EventViewers from "./EventViewers";
import EventSettingsButton from "./event-settings-button/EventSettingsButton";

export default function EventsDesktopView({ event }) {
  return (
    <MDBRow className="d-flex align-items-center">
      <MDBCol md="4">
        <EventTitle event={event} />
      </MDBCol>

      <MDBCol>
        <EventType event={event} />
      </MDBCol>

      <MDBCol>
        <EventSubscribers event={event} />
      </MDBCol>

      <MDBCol>
        <EventViewers event={event} />
      </MDBCol>

      <MDBCol md="0" className="mr-3">
        <EventSettingsButton event={event} />
      </MDBCol>
    </MDBRow>
  );
}

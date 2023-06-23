import React from "react";
import { MDBCardHeader } from "mdbreact";

export default function EventDetailsCardHeader({ event }) {
  return (
    <MDBCardHeader color="default-color-dark" className="text-center">
      <strong>{event.title}</strong>
    </MDBCardHeader>
  );
}

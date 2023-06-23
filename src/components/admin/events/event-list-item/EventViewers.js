import React from "react";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdbreact";

// constants
const MEETING_EVENT_TYPE = "meeting";

export default function EventViewers({ event }) {
  if (!event) return "";

  if (MEETING_EVENT_TYPE === event.type) {
    return (
      <Link to={`/admin/events/${event._id}/attendance`}>
        <MDBIcon icon="user-check" className="mr-1" size="sm" />
        Attendance
      </Link>
    );
  }

  return (
    <Link to={`/admin/events/${event._id}/viewers`}>
      <MDBIcon icon="eye" className="mr-1" size="sm" />
      Viewers
    </Link>
  );
}

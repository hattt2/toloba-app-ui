import React from "react";
import { MDBDropdownItem, MDBIcon, MDBLink } from "mdbreact";

export default function EventAttendanceLink({ event }) {
  return (
    <MDBDropdownItem tag={MDBLink} to={`/admin/events/${event._id}/attendance`}>
      <MDBIcon icon="user-check" className="mr-1" size="sm" />
      Attendance
    </MDBDropdownItem>
  );
}

import React from "react";
import { MDBDropdownItem, MDBIcon } from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { removeEvent } from "../../../../../store/events/admin/EventsAdminThunk";
import { hasPermissionForResource } from "../../../../../store/users/admin/UsersAdminSelector";

// service imports
import firebaseAttendanceService from "../../../../../services/firebaseAttendanceService";

export default function EventDeleteLink({ event }) {
  // store
  const dispatch = useDispatch();
  const permissionForEventsRemove = useSelector((state) =>
    hasPermissionForResource(state, "EVENTS", "REMOVE")
  );

  if (!permissionForEventsRemove) return "";

  function deleteEvent() {
    dispatch(removeEvent({ eventId: event._id }));
    firebaseAttendanceService.clearAttendance(event._id);
  }

  return (
    <>
      <MDBDropdownItem divider />
      <MDBDropdownItem className="text-danger" onClick={() => deleteEvent()}>
        <MDBIcon icon="trash" className="text-danger mr-1" size="sm" />
        Delete
      </MDBDropdownItem>
    </>
  );
}

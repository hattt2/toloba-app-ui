import React from "react";
import { MDBDropdownItem, MDBIcon } from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../../../../store/events/admin/EventsAdminThunk";
import { hasPermissionForResource } from "../../../../../store/users/admin/UsersAdminSelector";

export default function PublishBroadcastLink({ event }) {
  // store
  const dispatch = useDispatch();
  const permissionForEventsEdit = useSelector((state) =>
    hasPermissionForResource(state, "EVENTS", "EDIT")
  );

  if (!permissionForEventsEdit) return "";

  // local vars
  const attribs = {
    color: event.active ? "text-warning" : "text-success",
    icon: event.active ? "stop-circle" : "play-circle",
    label: event.active ? "Stop Broadcasting" : "Start Broadcasting",
  };

  function updateActiveStatus(active) {
    const requestBody = { active };
    dispatch(updateEvent({ eventId: event._id, requestBody }));
  }

  return (
    <MDBDropdownItem
      className={attribs.color}
      onClick={() => updateActiveStatus(!event.active)}
    >
      <MDBIcon
        icon={attribs.icon}
        className={`${attribs.color} mr-1`}
        size="sm"
      />
      {attribs.label}
    </MDBDropdownItem>
  );
}

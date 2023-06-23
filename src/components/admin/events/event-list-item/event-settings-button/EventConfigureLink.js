import React from "react";
import { MDBDropdownItem, MDBIcon, MDBLink } from "mdbreact";

// store imports
import { useSelector } from "react-redux";
import { hasPermissionForResource } from "../../../../../store/users/admin/UsersAdminSelector";

export default function ConfigureLink({ event }) {
  // store
  const permissionForEventsEdit = useSelector((state) =>
    hasPermissionForResource(state, "EVENTS", "EDIT")
  );

  if (!permissionForEventsEdit) return "";

  return (
    <MDBDropdownItem tag={MDBLink} to={`/admin/events/${event._id}`}>
      <MDBIcon icon="cogs" className="mr-1" size="sm" />
      Configure
    </MDBDropdownItem>
  );
}

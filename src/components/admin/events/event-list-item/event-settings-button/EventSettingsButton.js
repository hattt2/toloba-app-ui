import React from "react";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBIcon,
} from "mdbreact";

// component imports
import EventBroadcastLink from "./EventBroadcastLink";
import EventConfigureLink from "./EventConfigureLink";
import EventDeleteLink from "./EventDeleteLink";
import EventAttendanceLink from "./EventAttendanceLink";

export default function EventSettingsButton({ event }) {
  return (
    <>
      <MDBDropdown dropleft>
        <MDBDropdownToggle tag="a">
          <MDBIcon icon="cog" className="text-primary" size="lg" />
        </MDBDropdownToggle>

        <MDBDropdownMenu basic>
          <EventBroadcastLink event={event} />
          <EventConfigureLink event={event} />
          <EventAttendanceLink event={event} />
          <EventDeleteLink event={event} />
        </MDBDropdownMenu>
      </MDBDropdown>
    </>
  );
}

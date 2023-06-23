import React from "react";
import { MDBIcon, MDBTooltip } from "mdbreact";

export default function EventType({ event }) {
  if (event.type === "meeting") return <span>Meeting</span>;

  return (
    <a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      className={event.active ? "" : "text-muted"}
    >
      <MDBTooltip domElement tag="span" material placement="top">
        <span>
          Source URL
          <MDBIcon className="ml-2" icon="external-link-alt" />
        </span>
        <span>{event.link}</span>
      </MDBTooltip>
    </a>
  );
}

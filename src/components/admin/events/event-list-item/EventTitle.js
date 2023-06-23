import React from "react";
import { MDBIcon, MDBTooltip } from "mdbreact";

export default function EventTitle({ event }) {
  function truncateString(str, length = 25) {
    if (str.length > length) {
      return str.substring(0, length) + "...";
    } else {
      return str;
    }
  }

  function showActiveStatus() {
    return event.active ? (
      <div className="spinner-grow spinner-grow-sm text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <MDBIcon className="text-warning" icon="stop-circle" />
    );
  }

  function showTitle() {
    return (
      <MDBTooltip domElement tag="span" material placement="top">
        <span>{truncateString(event.title)}</span>
        <span>{event.title}</span>
      </MDBTooltip>
    );
  }

  return (
    <div className="d-flex align-items-center">
      {showActiveStatus()}
      <span className="ml-3">{showTitle()}</span>
    </div>
  );
}

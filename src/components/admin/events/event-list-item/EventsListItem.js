import React from "react";

// component imports
import EventsMobileView from "./EventsMobileView";
import EventsDesktopView from "./EventsDesktopView";

export default function EventListItem({ event }) {
  if (!event) return "";

  return (
    <>
      <div className="d-block d-lg-none mt-2">
        <EventsMobileView event={event}></EventsMobileView>
      </div>

      <div className="d-none d-lg-block">
        <EventsDesktopView event={event}></EventsDesktopView>
      </div>
    </>
  );
}

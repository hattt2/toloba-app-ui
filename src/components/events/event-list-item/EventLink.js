import React from "react";

// service imports
import firebaseAttendanceService from "../../../services/firebaseAttendanceService";

// plugin imports
import * as UAParser from "ua-parser-js";

// component imports
import BroadcastLink from "./BroadcastLink";
import MeetingLink from "./MeetingLink";

export default function EventLink({ children, event, user }) {
  if (!event || !user) return <>{children}</>;

  function markAttendance() {
    const UA = new UAParser(window.navigator.userAgent);
    const device = UA.getDevice()?.name || null;
    const browser = UA.getBrowser()?.name || null;
    const os = UA.getOS()?.name || null;
    const sessionInfo = [device, os, browser]
      .filter((val) => val !== undefined && val !== null)
      .join(" - ");

    return firebaseAttendanceService.markAttendance(event._id, user._id, {
      eventId: event._id,
      userId: user._id,
      itsNumber: user.itsNumber,
      hofItsNumber: user.hofItsNumber,
      fullName: user.fullName,
      jamaat: user.jamaat,
      event: event.title,
      device,
      browser,
      os,
      sessionInfo,
      joinedAt: new Date().toLocaleString(),
    });
  }

  switch (event.type) {
    case "meeting": {
      return (
        <MeetingLink
          eventId={event._id}
          user={user}
          subscribers={event.subscribers}
          markAttendance={markAttendance}
        >
          {children}
        </MeetingLink>
      );
    }
    default:
      return <BroadcastLink eventId={event._id}>{children}</BroadcastLink>;
  }
}

import React, { useEffect, useState } from "react";
import { MDBCard } from "mdbreact";

// firebase
import { onValue, off, remove, child } from "firebase/database";

// service imports
import firebaseSessionService from "../../../services/firebaseSessionService";
import firebaseAttendanceService from "../../../services/firebaseAttendanceService";

// component imports
import EventDetailsCardHeader from "./EventDetailsCardHeader";
import EventDetailsCardBody from "./EventDetailsCardBody";
import EventDetailsCardFooter from "./EventDetailsCardFooter";
import SessionLimitExhausted from "./SessionLimitExhausted";

// plugin imports
import * as UAParser from "ua-parser-js";

const DEFAULT_SCREEN_LIMIT = parseInt(
  process.env.REACT_APP_DEFAULT_SCREEN_LIMIT
);

export default function EventDetailsCard({ user, event }) {
  // local state
  const [isMaxScreenLimitReached, setIsMaxScreenLimitReached] = useState(false);
  const [sessionsEntities, setSessionsEntities] = useState(null);

  useEffect(() => {
    if (!event) return;
    const reference = firebaseSessionService.getReference(
      user ? user._id : "PUBLIC"
    );
    listenForActiveSessions(reference);

    return function onDestroy() {
      console.log("onDestroy called");

      const sessRef = child(
        reference,
        `/${firebaseSessionService.getSessionId()}`
      );

      remove(sessRef);
    };
  }, [user, event]);

  // On network reconnect, reload the page
  window.addEventListener("online", (e) => {
    window.location.reload();
  });

  function listenForActiveSessions(reference) {
    off(reference);
    onValue(reference, (snapshot) => {
      const activeSessions = snapshot.val() || {};
      setSessionsEntities(activeSessions);
      if (canAddSession(activeSessions)) addSession();
    });
  }

  function canAddSession(activeSessions) {
    const currentSessionId = firebaseSessionService.getSessionId();
    const sessionAlreadyExists = activeSessions[currentSessionId];
    const activeSessionCount = Object.keys(activeSessions).length;
    const maxScreenLimit = user?.screenLimit || DEFAULT_SCREEN_LIMIT;

    let maxScreenLimitReached =
      sessionAlreadyExists || event.public
        ? false
        : activeSessionCount >= maxScreenLimit;
    setIsMaxScreenLimitReached(maxScreenLimitReached);

    const result = !sessionAlreadyExists && !maxScreenLimitReached;
    return result;
  }

  function addSession() {
    const UA = new UAParser(window.navigator.userAgent);
    const device = UA.getDevice()?.name || null;
    const browser = UA.getBrowser()?.name || null;
    const os = UA.getOS()?.name || null;
    const sessionInfo = [device, os, browser]
      .filter((val) => val !== undefined && val !== null)
      .join(" - ");

    const session = {
      eventId: event._id,
      event: event.title,
      device,
      browser,
      os,
      sessionInfo,
      joinedAt: new Date().toLocaleString(),
    };

    if (user) {
      session.userId = user._id;
      session.itsNumber = user.itsNumber;
      session.hofItsNumber = user.hofItsNumber || "";
      session.fullName = user.fullName || "";
      session.jamaat = user.jamaat || "";
    }

    markAttendance(session);

    return firebaseSessionService
      .addSession(user ? user._id : "PUBLIC", session)
      .catch((err) => console.error("Error while adding session", err));
  }

  function markAttendance(session) {
    const currentSessionId = firebaseSessionService.getSessionId();

    return firebaseAttendanceService
      .markAttendance(
        event._id,
        user ? user._id : currentSessionId,
        session || null
      )
      .catch((err) => console.error("Error while marking attendance", err));
  }

  return (
    <MDBCard className="mb-3">
      <EventDetailsCardHeader event={event} />

      {isMaxScreenLimitReached ? (
        <SessionLimitExhausted
          userId={user?._id}
          addSession={addSession}
          sessionsEntities={sessionsEntities}
        />
      ) : (
        <>
          <EventDetailsCardBody event={event} />
          <EventDetailsCardFooter event={event} />
        </>
      )}
    </MDBCard>
  );
}

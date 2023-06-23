import React from "react";

// plugin imports
import * as jwt from "jsonwebtoken";

// constants
const MEET_SECRET_KEY = process.env.REACT_APP_MEET_SECRET_KEY;
const MEET_BASE_URL = process.env.REACT_APP_MEET_BASE_URL;
const DEFAULT_HOST_EMAIL = "admin@tolobaujjain.com";
const DEFAULT_AVATAR_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTutvuvtpDfUDNdKmymOAAUzzTJTMuitlcMSqp3PRF714uuGmmgx-d59fj9cur68XfynNs&usqp=CAU";
const CONFIG = "config.startWithAudioMuted=true";

export default function MeetingEventItem({
  children,
  eventId,
  user,
  subscribers,
  markAttendance,
}) {
  // local vars
  const isModerator = hasModeratorAccess();
  const meetLink = `https://${MEET_BASE_URL}/${eventId}?jwt=${getMeetToken()}#${CONFIG}`;

  function hasModeratorAccess() {
    if (!subscribers || !subscribers.length) return false;
    const subscriber = subscribers.find((s) => s.user === user._id);
    return subscriber && subscriber.host;
  }

  function getMeetToken() {
    const name = user.fullName;
    const meetUser = {
      name: isModerator ? `[HOST] ${name}` : name,
      affiliation: isModerator ? "owner" : "member",
      email: isModerator ? DEFAULT_HOST_EMAIL : null,
      avatar: isModerator ? null : DEFAULT_AVATAR_URL,
    };

    return getJwtToken(meetUser, isModerator);
  }

  function getJwtToken(meetUser, isModerator) {
    return jwt.sign(
      {
        context: {
          user: meetUser,
          features: {
            "screen-sharing": isModerator,
          },
        },
        aud: MEET_BASE_URL,
        iss: MEET_BASE_URL,
        sub: MEET_BASE_URL,
        room: "*",
      },
      MEET_SECRET_KEY,
      { algorithm: "HS256" }
    );
  }

  function showHostBadge() {
    if (!isModerator) return "";
    return <span className="ml-2">(HOST)</span>;
  }

  return (
    <a
      href={meetLink}
      className="stretched-link"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => markAttendance()}
    >
      {children}
      {showHostBadge()}
    </a>
  );
}

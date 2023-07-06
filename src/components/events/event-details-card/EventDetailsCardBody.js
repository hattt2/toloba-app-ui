import React from "react";
import { MDBCardBody } from "mdbreact";

// plugin imports
import jwtDecode from "jwt-decode";
import YoutubePlayer from "./YoutubePlayer";
import IFramePlayer from "./IFramePlayer";

export default function EventDetailsCardBody({ event }) {
  // local vars
  const sourceLink = decodeLink(event?.link);

  function decodeLink(jwt) {
    try {
      if (!jwt) return;
      const decoded = jwtDecode(jwt);
      return decoded.link;
    } catch (ex) {
      console.log("Error in decoding source link", ex);
      return null;
    }
  }

  return (
    <MDBCardBody>
      <div className="text-center mb-2">{event.desc}</div>
      {event.type === "youtube" ? (
        <YoutubePlayer sourceLink={sourceLink} />
      ) : (
        <IFramePlayer sourceLink={sourceLink} />
      )}
    </MDBCardBody>
  );
}

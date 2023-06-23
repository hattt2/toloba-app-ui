import React from "react";

// plugin imports
import { MDBIframe } from "mdbreact";

export default function IFramePlayer({ sourceLink }) {
  if (!sourceLink) return "";

  return <MDBIframe src={sourceLink} />;
}

import React from "react";
import { Link } from "react-router-dom";
import { MDBContainer } from "mdbreact";

export default function EventDetailsCardFooter({ event }) {
  if (!event.feedbackForm?.id) return "";

  return (
    <MDBContainer className="text-center mb-3">
      <Link
        className="btn btn-primary btn-sm"
        to={`/forms/${event.feedbackForm.type.charAt(0)}/${
          event.feedbackForm.id
        }`}
        target="_blank"
      >
        Submit Feedback
      </Link>
    </MDBContainer>
  );
}

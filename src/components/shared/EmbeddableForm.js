import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBSpinner } from "mdbreact";

export default function Form({ match }) {
  // route
  const { formId, provider } = match.params;

  // local state
  const [showLoader, setShowLoader] = useState(true);

  // local vars
  let formUrl = "";

  if (provider === "g") {
    formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;
  } else {
    formUrl = `https://airtable.com/embed/${formId}?backgroundColor=yellow`;
  }

  return (
    <MDBCard>
      <MDBCardBody>
        {showLoader && (
          <div className="pageLoader">
            <MDBSpinner />
          </div>
        )}

        <iframe
          title="Form"
          className="airtable-embed airtable-dynamic-height"
          src={formUrl}
          frameBorder="0"
          width="100%"
          height="680"
          style={{
            background: "transparent",
          }}
          onLoad={() => setShowLoader(false)}
        ></iframe>
      </MDBCardBody>
    </MDBCard>
  );
}

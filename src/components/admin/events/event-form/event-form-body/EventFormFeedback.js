import React from "react";
import { MDBInput, MDBSelect, MDBRow, MDBCol } from "mdbreact";

export default function EventFormFeedback({
  feedbackFormId,
  feedbackFormType,
  setFeedbackFormId,
  setFeedbackFormType,
}) {
  const formTypes = [
    {
      text: "Airtable",
      value: "airtable",
      checked: feedbackFormType !== "google",
    },
    {
      text: "Google",
      value: "google",
      checked: feedbackFormType === "google",
    },
  ];

  const handleInput = (e) => {
    switch (e.target.name) {
      case "feedbackFormId":
        setFeedbackFormId(e.target.value);
        break;
      default:
    }
  };

  function onChange(values) {
    const value = values && values.length ? values[0] : null;

    if (value) {
      setFeedbackFormType(value);
    }
  }

  return (
    <MDBRow>
      <MDBCol>
        <MDBSelect
          className="mr-2"
          options={formTypes}
          selected="Choose Form Type"
          label="Form Type"
          getValue={(values) => onChange(values)}
        ></MDBSelect>
      </MDBCol>

      <MDBCol>
        <MDBInput
          onInput={handleInput}
          label="Feedback Form Id"
          type="text"
          name="feedbackFormId"
          value={feedbackFormId}
        >
          <small className="form-text text-muted">Optional</small>
        </MDBInput>
      </MDBCol>
    </MDBRow>
  );
}

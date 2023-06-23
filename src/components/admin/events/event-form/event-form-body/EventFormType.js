import React from "react";
import { MDBInput, MDBSelect } from "mdbreact";

const MEETING_EVENT_TYPE = "meeting";
const YOUTUBE_EVENT_TYPE = "youtube";
const IFRAME_EVENT_TYPE = "iframe";

export default function EventFormType({ type, setType, link, setLink }) {
  // local vars
  const eventTypes = [
    {
      text: "Broadcast (Youtube)",
      value: "youtube",
      checked: type === YOUTUBE_EVENT_TYPE,
    },
    {
      text: "Broadcast (Other)",
      value: "iframe",
      checked: type === IFRAME_EVENT_TYPE,
    },
    // {
    //   text: "Meeting",
    //   value: "meeting",
    //   checked: type === MEETING_EVENT_TYPE,
    // },
  ];

  const handleInput = (e) => {
    switch (e.target.name) {
      case "link":
        setLink(e.target.value);
        break;
      default:
    }
  };

  function onChange(values) {
    const value = values && values.length ? values[0] : null;

    if (value) {
      setType(value);
      if (MEETING_EVENT_TYPE === type) setLink("");
    }
  }

  function renderInputForBroadcastLink() {
    if (MEETING_EVENT_TYPE === type) return "";

    return (
      <MDBInput
        onInput={handleInput}
        label="Source URL"
        type="url"
        name="link"
        value={link}
        required
      >
        <small className="form-text text-muted">
          https://www.youtube.com/watch?v=abcdefg
        </small>
        <div className="invalid-feedback">Valid URL required</div>
      </MDBInput>
    );
  }

  return (
    <>
      <MDBSelect
        options={eventTypes}
        selected="Choose Event Type"
        label="Event Type"
        getValue={(values) => onChange(values)}
      />

      {renderInputForBroadcastLink()}
    </>
  );
}

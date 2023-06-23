import React from "react";
import { MDBInput } from "mdbreact";

export default function EventFormTitle({ title, setTitle }) {
  const handleInput = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      default:
    }
  };

  return (
    <MDBInput
      onInput={handleInput}
      label="Title"
      type="text"
      name="title"
      value={title}
      minLength="6"
      maxLength="30"
      required
    >
      <div className="invalid-feedback">Length must be 6 to 30 chars long</div>
    </MDBInput>
  );
}

import React from "react";
import { MDBInput } from "mdbreact";

export default function EventFormDescription({ desc, setDesc }) {
  const handleInput = (e) => {
    switch (e.target.name) {
      case "desc":
        setDesc(e.target.value);
        break;
      default:
    }
  };

  return (
    <MDBInput
      onInput={handleInput}
      label="Description"
      type="text"
      name="desc"
      maxLength="255"
      value={desc}
    >
      <small className="form-text text-muted">Optional</small>
      <div className="invalid-feedback">Too long</div>
    </MDBInput>
  );
}

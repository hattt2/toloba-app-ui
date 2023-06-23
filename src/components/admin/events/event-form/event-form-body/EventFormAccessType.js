import React from "react";
import { MDBSelect } from "mdbreact";

export default function EventFormAccessType({ isPublic, setIsPublic }) {
  // local vars
  const accessTypes = [
    {
      text: "Public",
      value: "public",
      checked: isPublic,
    },
    {
      text: "Restricted (Only Subscribers)",
      value: "restricted",
      checked: !isPublic,
    },
  ];

  function onChange(values) {
    const value = values && values.length ? values[0] : null;

    if (value) {
      setIsPublic(value === "public");
    }
  }

  return (
    <MDBSelect
      options={accessTypes}
      selected="Choose Access Type"
      label="Access Type"
      getValue={(values) => onChange(values)}
    />
  );
}

import React from "react";
import { MDBSelect } from "mdbreact";

export default function JamaatSelector({
  jamaatList,
  selectedJamaat,
  setSelectedJamaat,
}) {
  // local vars
  const options = jamaatList.map((jamaat) => {
    const { fields } = jamaat;

    return {
      text: fields?.displayName,
      value: jamaat.id,
      checked: selectedJamaat?.id === jamaat.id,
    };
  });

  function onChange(values) {
    const value = values && values.length ? values[0] : null;

    if (value) {
      const selection = jamaatList.find((jamaat) => jamaat.id === value);
      setSelectedJamaat(selection);
    }
  }

  return (
    <MDBSelect
      search
      options={options}
      selected="Select Jamaat"
      label="Select Jamaat"
      getValue={(values) => onChange(values)}
    />
  );
}

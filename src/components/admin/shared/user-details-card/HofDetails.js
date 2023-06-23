import React from "react";
import { MDBTable, MDBTableBody } from "mdbreact";

export default function HofDetails({ user, showMetaInfo }) {
  function renderHofDetails(hof) {
    if (!showMetaInfo) return "";

    return (
      <MDBTable>
        <MDBTableBody>
          <tr>
            <td>
              <strong>Jamaat</strong>
            </td>
            <td>{hof.jamaat}</td>
          </tr>
          <tr>
            <td>
              <strong>Sabeel No</strong>
            </td>
            <td>{hof.tanzeemFileNumber}</td>
          </tr>
          <tr>
            <td>
              <strong>Sector</strong>
            </td>
            <td>{hof.sector || "NOT_TAGGED"}</td>
          </tr>
          <tr>
            <td>
              <strong>Sub-Sector</strong>
            </td>
            <td>{hof.subSector || "NOT_TAGGED"}</td>
          </tr>
          {hof.building ? (
            <tr>
              <td>
                <strong>Building</strong>
              </td>
              <td>{hof.building}</td>
            </tr>
          ) : null}
        </MDBTableBody>
      </MDBTable>
    );
  }

  return renderHofDetails(user);
}

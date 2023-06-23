import React from "react";
import {
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdbreact";

// plugin imports
import jsPDF from "jspdf";
const { svgAsPngUri, svgAsDataUri } = require("save-svg-as-png");

export default function DownloadOptions({ selectedJamaat }) {
  function downloadAsSvg(e, elementId = "letterheadLogo", fileName = "logo") {
    e.preventDefault();

    svgAsDataUri(document.getElementById(elementId)).then((uri) => {
      downloadURI(uri, `${fileName}.svg`);
    });
  }

  function downloadAsPng(e, elementId = "letterheadLogo", fileName = "logo") {
    e.preventDefault();

    svgAsPngUri(document.getElementById(elementId)).then((uri) => {
      downloadURI(uri, `${fileName}.png`);
    });
  }

  function downloadAsPdf(e, elementId = "letterheadLogo", fileName = "logo") {
    e.preventDefault();

    svgAsPngUri(document.getElementById(elementId)).then((uri) => {
      const pdf = new jsPDF();
      pdf.addImage(uri, "PNG", 0, 0, 210, 0);
      pdf.save(`${fileName}.pdf`);
    });
  }

  function downloadURI(uri, name) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function renderDownloadLinks(resource) {
    const fileName = selectedJamaat?.displayName || resource;

    return (
      <>
        <MDBDropdownItem onClick={(e) => downloadAsSvg(e, resource, fileName)}>
          SVG
        </MDBDropdownItem>
        <MDBDropdownItem onClick={(e) => downloadAsPng(e, resource, fileName)}>
          PNG
        </MDBDropdownItem>
        <MDBDropdownItem onClick={(e) => downloadAsPdf(e, resource, fileName)}>
          PDF
        </MDBDropdownItem>
      </>
    );
  }

  return (
    <div>
      <MDBBtnGroup>
        <MDBDropdown>
          <MDBDropdownToggle caret>Download Logo</MDBDropdownToggle>
          <MDBDropdownMenu>
            {renderDownloadLinks("letterheadLogo")}
          </MDBDropdownMenu>
        </MDBDropdown>

        <MDBDropdown>
          <MDBDropdownToggle caret>Download Letterhead</MDBDropdownToggle>
          <MDBDropdownMenu>
            {renderDownloadLinks("tolobaLetterhead")}
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBBtnGroup>
    </div>
  );
}

import React from "react";
import { MDBFooter } from "mdbreact";

// constants
const APP_FULL_NAME = process.env.REACT_APP_FULL_NAME;

export default function Footer() {
  return (
    <>
      <MDBFooter className="fixed-bottom" color="default-color-dark">
        <p className="footer-copyright mb-0 py-3 text-center">
          &copy; {new Date().getFullYear()} &nbsp;
          {APP_FULL_NAME}
        </p>
      </MDBFooter>
    </>
  );
}

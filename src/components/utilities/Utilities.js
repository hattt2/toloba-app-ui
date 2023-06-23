import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBContainer } from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { selectJamaats } from "../../store/jamaats/JamaatsSelector";
import { fetchJamaats } from "../../store/jamaats/JamaatsThunk";

// component imports
import TolobaLogo from "./TolobaLogo";
import TolobaLetterhead from "./TolobaLetterhead";
import JamaatSelector from "./JamaatSelector";
import DownloadOptions from "./DownloadOptions";

// plugin imports
const { svgAsDataUri } = require("save-svg-as-png");

export default function Utilities() {
  // store
  const dispatch = useDispatch();
  const jamaats = useSelector(selectJamaats);

  // local state
  const [selectedJamaat, setSelectedJamaat] = useState(null);
  const [logoSvg, setLogoSvg] = useState(null);
  const [logoWatermarkSvg, setLogoWatermarkSvg] = useState(null);

  useEffect(() => {
    dispatch(fetchJamaats());
  }, [dispatch]);

  useEffect(() => {
    if (selectedJamaat) {
      svgAsDataUri(document.getElementById("letterheadLogo")).then((uri) => {
        setLogoSvg(uri);
      });

      svgAsDataUri(document.getElementById("letterheadWatermark")).then(
        (uri) => {
          setLogoWatermarkSvg(uri);
        }
      );
    }
  }, [selectedJamaat]);

  function renderLoader() {
    return <div className="text-center">Loading jamaats...</div>;
  }

  function renderHiddenContent() {
    return (
      <div style={{ display: "none" }}>
        <TolobaLogo
          id="letterheadWatermark"
          color="#F3F3F3"
          selectedJamaat={selectedJamaat?.fields}
        />

        <TolobaLetterhead
          logoSvg={logoSvg}
          logoWatermarkSvg={logoWatermarkSvg}
          selectedJamaat={selectedJamaat?.fields}
        />
      </div>
    );
  }

  function renderContent() {
    return (
      <>
        <JamaatSelector
          jamaatList={jamaats}
          selectedJamaat={selectedJamaat}
          setSelectedJamaat={setSelectedJamaat}
        ></JamaatSelector>

        {selectedJamaat && (
          <>
            <TolobaLogo
              id="letterheadLogo"
              color="#48887b"
              selectedJamaat={selectedJamaat?.fields}
            />

            {renderHiddenContent()}

            <DownloadOptions selectedJamaat={selectedJamaat?.fields} />
          </>
        )}
      </>
    );
  }

  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody className="text-center">
          {jamaats?.length ? renderContent() : renderLoader()}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

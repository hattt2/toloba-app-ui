import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBIcon,
} from "mdbreact";

// assets imports
import assetsService from "../../services/assetsService";

// constants
const DEFAULT_FEED_IMAGE = "default-feed-image.png";

export default function Feed({ feed }) {
  return (
    <MDBCard className="mb-4">
      <MDBCardImage
        className="img-fluid"
        src={assetsService.getSrcUrl(feed.image || DEFAULT_FEED_IMAGE)}
      />
      <MDBCardBody>
        <MDBCardTitle>{feed.title}</MDBCardTitle>
        <MDBCardText>{feed.desc}</MDBCardText>

        {feed.actionButton && (
          <Link
            to={feed.actionButton.link}
            className="mt-1 d-flex justify-content-end align-items-center"
          >
            <h5>
              {feed.actionButton.name}{" "}
              <MDBIcon
                icon="chevron-right"
                className="ml-2"
                size="sm"
              ></MDBIcon>
            </h5>
          </Link>
        )}
      </MDBCardBody>
    </MDBCard>
  );
}

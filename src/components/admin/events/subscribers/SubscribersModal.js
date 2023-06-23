import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";

// store imports
import { useSelector } from "react-redux";
import { selectEventById } from "../../../../store/events/admin/EventsAdminSelector";

// css imports
import "./SubscribersModal.css";

// component imports
import SubscribersList from "./SubscribersList";
import SubscribersForm from "./SubscribersForm";

export default function SubscribersModal() {
  // route
  const history = useHistory();
  const { eventId } = useParams();

  // store
  const event = useSelector((state) => selectEventById(state, eventId));

  function closeModal() {
    history.push(`/admin/events`);
  }

  return (
    <MDBModal size="lg" isOpen={true} toggle={closeModal}>
      <MDBModalHeader toggle={closeModal}>
        Subscribers - {event?.title}
      </MDBModalHeader>

      <MDBModalBody>
        <MDBContainer>
          <SubscribersForm event={event} />
          <SubscribersList event={event} />
        </MDBContainer>
      </MDBModalBody>
    </MDBModal>
  );
}

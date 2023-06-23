import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";

// store imports
import { selectEventById } from "../../../../store/events/admin/EventsAdminSelector";

// component imports
import EventFormModalHeader from "./EventFormModalHeader";
import EventFormBody from "./event-form-body/EventFormBody";
import EventFormModalFooter from "./EventFormModalFooter";

export default function EventFormModal(props) {
  // route
  const history = useHistory();
  const { eventId } = props.match.params;

  // store
  let event = useSelector((state) => selectEventById(state, eventId));

  if (eventId === "new") {
    event = {};
  }

  function closeModal() {
    history.push(`/admin/events`);
  }

  return (
    <MDBModal isOpen={true} toggle={closeModal}>
      <MDBModalHeader toggle={closeModal}>
        <EventFormModalHeader event={event} />
      </MDBModalHeader>

      <MDBModalBody>
        <EventFormBody event={event} closeModal={closeModal} />
      </MDBModalBody>

      <MDBModalFooter>
        <EventFormModalFooter />
      </MDBModalFooter>
    </MDBModal>
  );
}

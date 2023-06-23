import React, { useState } from "react";
import { useDispatch } from "react-redux";

// store imports
import {
  addEvent,
  updateEvent,
} from "../../../../../store/events/admin/EventsAdminThunk";

// component imports
import EventFormTitle from "./EventFormTitle";
import EventFormType from "./EventFormType";
import EventFormAccessType from "./EventFormAccessType";
import EventFormDescription from "./EventFormDescription";
import EventFormFeedback from "./EventFormFeedback";

export default function EventFormBody({ event, closeModal }) {
  // store
  const dispatch = useDispatch();

  // local state
  const [title, setTitle] = useState(event.title);
  const [type, setType] = useState(event.type);
  const [link, setLink] = useState(event.link);
  const [isPublic, setIsPublic] = useState(event.public);
  const [desc, setDesc] = useState(event.desc);
  const [feedbackFormType, setFeedbackFormType] = useState(
    event.feedbackForm ? event.feedbackForm.type || "" : ""
  );
  const [feedbackFormId, setFeedbackFormId] = useState(
    event.feedbackForm ? event.feedbackForm.id || "" : ""
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.className += " was-validated";

    // if form is valid then save and proceed
    if (e.target.checkValidity()) {
      if (event._id) {
        dispatch(
          updateEvent({ eventId: event._id, requestBody: eventRequestBody() })
        );
      } else {
        dispatch(addEvent({ requestBody: eventRequestBody() }));
      }

      closeModal();
    }
  };

  function eventRequestBody() {
    const evnt = {
      title,
      type,
      link,
      public: isPublic,
      desc,
      feedbackForm: null,
    };

    if (feedbackFormId && feedbackFormId.length) {
      evnt.feedbackForm = {
        type: feedbackFormType,
        id: feedbackFormId,
      };
    }

    return evnt;
  }

  return (
    <form
      id="eventForm"
      className="needs-validation"
      noValidate
      onSubmit={submitHandler}
    >
      <EventFormTitle title={title} setTitle={setTitle} />
      <EventFormType
        type={type}
        setType={setType}
        link={link}
        setLink={setLink}
      />
      <EventFormAccessType isPublic={isPublic} setIsPublic={setIsPublic} />
      <EventFormDescription desc={desc} setDesc={setDesc} />
      <EventFormFeedback
        feedbackFormId={feedbackFormId}
        feedbackFormType={feedbackFormType}
        setFeedbackFormId={setFeedbackFormId}
        setFeedbackFormType={setFeedbackFormType}
      />
    </form>
  );
}

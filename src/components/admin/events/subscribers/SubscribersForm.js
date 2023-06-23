import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import {
  bulkAddSubscribers,
  bulkRemoveSubscribers,
} from "../../../../store/subscribers/admin/SubscribersAdminThunk";
import { hasPermissionForResource } from "../../../../store/users/admin/UsersAdminSelector";

// css imports
import "./SubscribersModal.css";

export default function SubscribersForm({ event }) {
  // route
  const history = useHistory();

  // local state
  const [itsNumbers, setItsNumbers] = useState([]);
  const [actionType, setActionType] = useState(null);

  // store
  const dispatch = useDispatch();
  const permissionForSubscribersAdd = useSelector((state) =>
    hasPermissionForResource(state, "SUBSCRIBERS", "ADD")
  );
  const permissionForSubscribersRemove = useSelector((state) =>
    hasPermissionForResource(state, "SUBSCRIBERS", "REMOVE")
  );

  if (!permissionForSubscribersAdd && !permissionForSubscribersRemove)
    return "";

  function closeModal() {
    history.push(`/admin/events`);
  }

  const handleInput = (e) => {
    switch (e.target.name) {
      case "itsNumbers":
        setItsNumbers(e.target.value);
        break;
      default:
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";

    // if form is valid then save and proceed
    if (e.target.checkValidity()) {
      switch (actionType) {
        case "ADD":
          addSubscribers();
          break;
        case "REMOVE":
          removeSubscribers();
          break;
        default:
      }

      closeModal();
    }
  };

  function getItsIdArr() {
    const itsIds = [];

    itsNumbers.split(/[\n,]/).forEach((its) => {
      its = its.trim();
      if (its.length) itsIds.push(its);
    });

    return itsIds;
  }

  function addSubscribers() {
    dispatch(
      bulkAddSubscribers({
        eventId: event._id,
        itsNumbers: getItsIdArr(),
      })
    );
  }

  function removeSubscribers() {
    dispatch(
      bulkRemoveSubscribers({
        eventId: event._id,
        itsNumbers: getItsIdArr(),
      })
    );
  }

  function renderAddButton() {
    if (!permissionForSubscribersAdd) return "";

    return (
      <MDBBtn
        color="success"
        size="sm"
        type="submit"
        form="subscriberForm"
        onClick={() => setActionType("ADD")}
        disabled={!itsNumbers || itsNumbers.length < 8}
      >
        Add
      </MDBBtn>
    );
  }

  function renderRemoveButton() {
    if (!permissionForSubscribersRemove) return "";

    return (
      <MDBBtn
        color="danger"
        size="sm"
        type="submit"
        form="subscriberForm"
        onClick={() => setActionType("REMOVE")}
        disabled={!itsNumbers || itsNumbers.length < 8}
      >
        Remove
      </MDBBtn>
    );
  }

  return (
    <form
      id="subscriberForm"
      className="needs-validation"
      noValidate
      onSubmit={submitHandler}
    >
      <MDBInput
        onInput={handleInput}
        name="itsNumbers"
        type="textarea"
        label="ITS Numbers"
        rows="1"
      >
        <small className="form-text text-muted">
          Newline or Comma Separated
        </small>
      </MDBInput>

      {renderAddButton()}
      {renderRemoveButton()}
    </form>
  );
}

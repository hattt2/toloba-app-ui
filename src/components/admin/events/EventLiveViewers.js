import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  MDBDataTable,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";

// service imports
import firebaseSessionService from "../../../services/firebaseSessionService";

// store imports
import { useSelector } from "react-redux";
import { selectEventById } from "../../../store/events/admin/EventsAdminSelector";

// firebase imports
import { off, onValue } from "firebase/database";

export default function EventLiveViewers() {
  // route
  const history = useHistory();
  const { eventId } = useParams();

  // store
  const event = useSelector((state) => selectEventById(state, eventId));

  // local state
  const [sessionsEntities, setSessionsEntities] = useState(null);

  useEffect(() => {
    if (!event) return;
    const reference = firebaseSessionService.getReference();
    listenForActiveSessions(reference);

    return function onDestroy() {
      off(reference);
    };
  }, [event]);

  // On network reconnect, reload the page
  window.addEventListener("online", (e) => {
    window.location.reload();
  });

  function listenForActiveSessions(reference) {
    onValue(reference, (snapshot) => {
      const activeSessions = snapshot.val() || {};
      setSessionsEntities(activeSessions);
    });
  }

  function getTableData() {
    const data = {
      columns: getTableColumns(),
      rows: getTableRows(),
    };

    return data;
  }

  function getTableColumns() {
    const columns = [
      {
        label: "ITS Id",
        field: "itsNumber",
        width: 100,
      },
      {
        label: "HOF ITS",
        field: "hofItsNumber",
        width: 100,
      },
      {
        label: "Full Name",
        field: "fullName",
        width: 300,
      },
      {
        label: "Jamaat",
        field: "jamaat",
        width: 100,
      },
      {
        label: "Joined At",
        field: "joinedAt",
        width: 100,
      },
      {
        label: "Session Info",
        field: "sessionInfo",
        width: 100,
      },
    ];

    return columns;
  }

  function getTableRows() {
    const rows = [];

    Object.keys(sessionsEntities || {}).forEach((userId) => {
      Object.keys(sessionsEntities[userId] || {}).forEach((sessionId) => {
        const session = sessionsEntities[userId][sessionId];
        if (session.eventId === event._id) rows.push(session);
      });
    });

    return rows;
  }

  function closeModal() {
    history.push(`/admin/events`);
  }

  return (
    <MDBModal size="lg" isOpen={true} toggle={closeModal}>
      <MDBModalHeader toggle={closeModal}>
        {event.title} - {getTableRows().length} Viewer(s)
      </MDBModalHeader>

      <MDBModalBody>
        <MDBContainer>
          <MDBDataTable
            responsive
            small
            searchLabel={`Search Viewers`}
            striped
            bordered
            data={getTableData()}
            paging={false}
          />
        </MDBContainer>
      </MDBModalBody>
    </MDBModal>
  );
}

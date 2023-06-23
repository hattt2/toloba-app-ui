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
import firebaseAttendanceService from "../../../services/firebaseAttendanceService";

// store imports
import { useSelector } from "react-redux";
import { selectEventById } from "../../../store/events/admin/EventsAdminSelector";

// firebase imports
import { off, onValue } from "firebase/database";

// plugin imports
import * as _ from "lodash";

export default function EventAttendance() {
  // route
  const history = useHistory();
  const { eventId } = useParams();

  // store
  const event = useSelector((state) => selectEventById(state, eventId));

  // local state
  const [attendanceEntities, setAttendanceEntities] = useState(null);

  useEffect(() => {
    if (!event) return;
    const reference = firebaseAttendanceService.getReference(event._id);
    listenForAttendance(reference);

    return function onDestroy() {
      off(reference);
    };
  }, [event]);

  // On network reconnect, reload the page
  window.addEventListener("online", (e) => {
    window.location.reload();
  });

  function listenForAttendance(reference) {
    onValue(reference, (snapshot) => {
      const attendance = snapshot.val() || {};
      setAttendanceEntities(attendance);
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
        label: "Joined At",
        field: "joinedAt",
        width: 100,
      },
      {
        label: "Session Info",
        field: "sessionInfo",
        width: 100,
      },
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
    ];

    return columns;
  }

  function getTableRows() {
    return Object.keys(attendanceEntities || {}).map((userId) => {
      const attendance = attendanceEntities[userId];
      attendance.joinedAt = attendance.joinedAt.replace(",", "-");

      return _.pick(attendance, [
        "joinedAt",
        "sessionInfo",
        "itsNumber",
        "hofItsNumber",
        "fullName",
        "jamaat",
      ]);
    });
  }

  function closeModal() {
    history.push(`/admin/events`);
  }

  return (
    <MDBModal size="lg" isOpen={true} toggle={closeModal}>
      <MDBModalHeader toggle={closeModal}>
        {event.title} - {getTableRows().length} Attended
      </MDBModalHeader>

      <MDBModalBody>
        <MDBContainer>
          <MDBDataTable
            responsive
            small
            searchLabel={`Search...`}
            striped
            bordered
            data={getTableData()}
            paging={false}
            exportToCSV
          />
        </MDBContainer>
      </MDBModalBody>
    </MDBModal>
  );
}

import React from "react";
import {
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";

// service imports
import firebaseSessionService from "../../../services/firebaseSessionService";

export default function SessionLimitExhausted({
  userId,
  addSession,
  sessionsEntities,
}) {
  async function removeSession(sessId) {
    try {
      await addSession();
      await firebaseSessionService.removeSession(userId, sessId);
      console.log("[removeSession] Old session removed");
    } catch (err) {
      console.error("[removeSession] Error", err);
    }
  }

  function renderSessionListItem(session) {
    return (
      <MDBListGroupItem key={session.id}>
        {session.sessionInfo}
        <MDBIcon
          onClick={() => removeSession(session.id)}
          icon="times-circle"
          className="text-danger ml-2"
          style={{ cursor: "pointer" }}
        />
      </MDBListGroupItem>
    );
  }

  function renderActiveSessionList() {
    const sessionIds = Object.keys(sessionsEntities || {});

    return (
      <MDBListGroup>
        {sessionIds.map((sessId) => {
          const session = sessionsEntities[sessId];
          session.id = sessId;
          return renderSessionListItem(session);
        })}
      </MDBListGroup>
    );
  }

  return (
    <>
      <h5 className="text-center text-danger mb-4 mt-4">
        <strong>Maximum screen limit reached</strong>
      </h5>

      <MDBContainer className="text-center mb-4">
        <h5>
          <strong>Other Active Sessions</strong>
        </h5>

        {renderActiveSessionList()}
      </MDBContainer>
    </>
  );
}

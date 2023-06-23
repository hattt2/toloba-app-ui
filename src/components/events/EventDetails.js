import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { MDBContainer, MDBSpinner } from "mdbreact";

// component imports
import EventDetailsCard from "./event-details-card/EventDetailsCard";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/AuthSelector";
import { fetchEventById } from "../../store/events/EventsThunk";
import { selectEventById } from "../../store/events/EventsSelector";
import { logout } from "../../store/auth/AuthThunk";

export default function EventDetails({ match }) {
  // route
  const history = useHistory();
  const { eventId } = match.params;

  // store
  const dispatch = useDispatch();
  const event = useSelector((state) => selectEventById(state, eventId));
  const eventStatus = useSelector((state) => state.events.status);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchEventById(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    if (eventStatus === "failed") {
      if (!currentUser) dispatch(logout());
      else history.push("/dashboard");
    }
  }, [eventStatus, currentUser, dispatch, history]);

  return (
    <MDBContainer>
      {!event ? (
        <div className="pageLoader">
          <MDBSpinner />
        </div>
      ) : (
        <EventDetailsCard user={currentUser} event={event} />
      )}
    </MDBContainer>
  );
}

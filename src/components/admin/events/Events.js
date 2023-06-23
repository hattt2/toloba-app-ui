import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import {
  MDBCard,
  MDBCardHeader,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../store/events/admin/EventsAdminThunk";
import { selectAllEvents } from "../../../store/events/admin/EventsAdminSelector";
import { hasPermissionForResource } from "../../../store/users/admin/UsersAdminSelector";

// component imports
import EventListItem from "./event-list-item/EventsListItem";
import EventFormModal from "./event-form/EventFormModal";
import SubscribersModal from "./subscribers/SubscribersModal";
import EventLiveViewers from "./EventLiveViewers";
import EventAttendance from "./EventAttendance";

export default function Events() {
  // store
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const permissionForEventsAdd = useSelector((state) =>
    hasPermissionForResource(state, "EVENTS", "ADD")
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  function renderAddEventBtn() {
    if (!permissionForEventsAdd) return "";

    return (
      <Link to={`/admin/events/new`} className="btn btn-sm btn-secondary">
        <MDBIcon icon="plus" className="mr-2" size="sm" />
        Add Event
      </Link>
    );
  }

  return (
    <>
      <MDBContainer>
        {renderAddEventBtn()}

        {events && events.length ? (
          <MDBCard>
            <MDBCardHeader color="primary-color">
              <div className="text-center">EVENTS</div>
            </MDBCardHeader>

            <MDBListGroup>
              {events?.map((event) => {
                return (
                  <MDBListGroupItem
                    key={event._id}
                    className={event.active ? "" : "text-muted"}
                  >
                    <EventListItem event={event}></EventListItem>
                  </MDBListGroupItem>
                );
              })}
            </MDBListGroup>
          </MDBCard>
        ) : (
          ""
        )}
      </MDBContainer>

      <Route
        exact
        path="/admin/events/:eventId/subscribers"
        component={SubscribersModal}
      />

      <Route
        exact
        path="/admin/events/:eventId/viewers"
        component={EventLiveViewers}
      />

      <Route
        exact
        path="/admin/events/:eventId/attendance"
        component={EventAttendance}
      />

      <Route exact path="/admin/events/:eventId" component={EventFormModal} />
    </>
  );
}

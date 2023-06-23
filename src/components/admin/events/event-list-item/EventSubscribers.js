import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MDBBadge, MDBIcon } from "mdbreact";

// store imports
import { hasPermissionForResource } from "../../../../store/users/admin/UsersAdminSelector";

export default function EventSubscribers({ event }) {
  // store
  const permissionForSubscribersRead = useSelector((state) =>
    hasPermissionForResource(state, "SUBSCRIBERS", "READ")
  );

  if (!event.public) {
    const subscribersLabel = `${event.subscribers?.length} Subscriber(s)`;

    return permissionForSubscribersRead ? (
      <Link to={`/admin/events/${event._id}/subscribers`} disabled>
        <MDBIcon icon="users" className="mr-1" size="sm" />
        {subscribersLabel}
      </Link>
    ) : (
      <div>{subscribersLabel}</div>
    );
  }

  return (
    <h6>
      <MDBBadge color="light">
        <MDBIcon icon="globe-americas" />
        &nbsp;Public Event
      </MDBBadge>
    </h6>
  );
}

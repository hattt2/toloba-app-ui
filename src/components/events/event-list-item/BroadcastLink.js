import React from "react";
import { Link } from "react-router-dom";

export default function BroadcastEventItem({ children, eventId }) {
  return (
    <Link to={`/live/${eventId}`} className="stretched-link">
      {children}
    </Link>
  );
}

export default function EventFormModalHeader({ event }) {
  return event._id ? "Edit Event" : "Add Event";
}

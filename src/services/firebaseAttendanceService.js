// firebase
import { rtDatabase } from "../firebase";
import { ref, child, set, remove } from "firebase/database";

function getReference(eventId, userId) {
  let reference = ref(rtDatabase, `/events/attendance/${eventId}`);
  if (userId) reference = child(reference, `/${userId}`);
  return reference;
}

async function markAttendance(eventId, userId, data) {
  const reference = getReference(eventId, userId);
  return set(reference, data);
}

function clearAttendance(eventId) {
  const reference = getReference(eventId);
  remove(reference);
}

export default {
  getReference,
  markAttendance,
  clearAttendance,
};

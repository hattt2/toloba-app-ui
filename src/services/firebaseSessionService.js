// firebase
import { rtDatabase } from "../firebase";
import { ref, child, set, onDisconnect, remove } from "firebase/database";

// plugin imports
import * as shortId from "shortid";

// constants
const SESSION_KEY = process.env.REACT_APP_SESSION_KEY;

setSessionId();

function setSessionId() {
  if (!getSessionId()) {
    localStorage.setItem(SESSION_KEY, shortId.generate());
  }
}

function getSessionId() {
  return localStorage.getItem(SESSION_KEY);
}

function getReference(userId, sessId) {
  let reference = ref(rtDatabase, `/events/activeSessions`);
  if (userId) reference = child(reference, `/${userId}`);
  if (sessId) reference = child(reference, `/${sessId}`);
  return reference;
}

async function addSession(userId, data, sessId = getSessionId()) {
  const reference = getReference(userId, sessId);
  await onDisconnect(reference).remove();
  return set(reference, data);
}

function removeSession(userId, sessId = getSessionId()) {
  const reference = getReference(userId, sessId);
  remove(reference);
}

export default {
  getSessionId,
  getReference,
  addSession,
  removeSession,
};

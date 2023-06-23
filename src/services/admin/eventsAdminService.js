import http from "../httpService";

const apiEndpoint = "/events";

function fetchEvents() {
  return http.adminGet(apiEndpoint);
}

function add(event) {
  return http.adminPost(`${apiEndpoint}`, event);
}

function update(eventId, event) {
  return http.adminPut(`${apiEndpoint}/${eventId}`, event);
}

function remove(eventId) {
  return http.adminDelete(`${apiEndpoint}/${eventId}`);
}

export default {
  fetchEvents,
  add,
  update,
  remove,
};

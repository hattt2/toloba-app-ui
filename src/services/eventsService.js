import http from "./httpService";

const apiEndpoint = "/events";

function eventUrl(id) {
  return `${apiEndpoint}/${id}`;
}

function fetchAccessibleEvents() {
  return http.get(apiEndpoint);
}

function fetchEventById(eventId) {
  return http.get(eventUrl(eventId));
}

export default {
  fetchAccessibleEvents,
  fetchEventById,
};

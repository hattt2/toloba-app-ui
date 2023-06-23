import http from "../httpService";

const apiEndpoint = "/events/:eventId/subscribers";

function fetchSubscribers(eventId) {
  let endpoint = apiEndpoint.replace(":eventId", eventId);
  return http.adminGet(endpoint);
}

function update(eventId, subscriberId, host) {
  let endpoint = apiEndpoint.replace(":eventId", eventId);
  return http.adminPut(`${endpoint}/${subscriberId}`, { host });
}

function bulkAdd(eventId, itsNumbers) {
  let endpoint = apiEndpoint.replace(":eventId", eventId);
  return http.adminPost(endpoint, itsNumbers);
}

function bulkRemove(eventId, itsNumbers) {
  let endpoint = apiEndpoint.replace(":eventId", eventId);
  return http.adminDelete(endpoint, { data: itsNumbers });
}

export default {
  fetchSubscribers,
  update,
  bulkAdd,
  bulkRemove,
};

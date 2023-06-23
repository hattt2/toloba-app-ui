import http from "./httpService";

const apiEndpoint = "/feeds";

function fetchActiveFeeds() {
  return http.get(apiEndpoint);
}

export default {
  fetchActiveFeeds,
};

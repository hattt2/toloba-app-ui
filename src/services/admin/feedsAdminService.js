import http from "../httpService";

const apiEndpoint = "/feeds";

function fetchFeeds() {
  return http.adminGet(apiEndpoint);
}

export default {
  fetchFeeds,
};

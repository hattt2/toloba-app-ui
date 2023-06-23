import http from "../httpService";

const apiEndpoint = "/users";

function fetchUsers(query = "", onlyAdmins = false) {
  return http.adminGet(`${apiEndpoint}?q=${query}&onlyAdmins=${onlyAdmins}`);
}

function fetchUsersByHofIts(hofIts) {
  return http.adminGet(`${apiEndpoint}/${hofIts}/family`);
}

function fetchStats() {
  return http.adminGet(`${apiEndpoint}/stats`);
}

function bulkInsert(users) {
  return http.adminPost(`${apiEndpoint}/bulk`, users);
}

function updateUser(userId, profile) {
  return http.adminPut(`${apiEndpoint}/${userId}`, profile);
}

export default {
  fetchUsers,
  fetchUsersByHofIts,
  fetchStats,
  bulkInsert,
  updateUser,
};

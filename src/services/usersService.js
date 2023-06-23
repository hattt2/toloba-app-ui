import http from "./httpService";

const apiEndpoint = "/users";

function fetchProfile() {
  return http.get(`${apiEndpoint}/me`);
}

function updateProfile(profile) {
  return http.put(apiEndpoint, profile);
}

function getFullName(user) {
  let fullName = `${user.firstName}${
    user.gender === "Male" ? " Bhai" : user.gender === "Female" ? " Ben" : ""
  } ${user.lastName}`;
  if (user.namePrefix) fullName = `${user.namePrefix} ${fullName}`;
  return fullName;
}

export default {
  fetchProfile,
  updateProfile,
  getFullName,
};

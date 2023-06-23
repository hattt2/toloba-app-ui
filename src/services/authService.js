import http from "./httpService";

// plugin imports
import jwtDecode from "jwt-decode";

// constants
const TOKEN_KEY = process.env.REACT_APP_AUTH_TOKEN_KEY;
const AUTH_HEADER_KEY = "x-auth-token";
const apiEndpoint = "/auth";
const rolesApiEndpoint = "/roles";

async function login(itsNumber, password) {
  const { headers } = await http.post(apiEndpoint, {
    itsNumber,
    password,
  });

  const jwt = headers[AUTH_HEADER_KEY];
  http.setJwt(jwt);
  return loginWithJwt(jwt);
}

function fetchRoles() {
  return http.get(rolesApiEndpoint);
}

function loginWithJwt(jwt = getJwt()) {
  setJwt(jwt);
  return getCurrentUser(jwt);
}

function logout() {
  http.setJwt(null);
  removeJwt();
}

function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

function setJwt(jwt) {
  localStorage.setItem(TOKEN_KEY, jwt);
}

function removeJwt() {
  localStorage.removeItem(TOKEN_KEY);
}

function getCurrentUser(jwt) {
  try {
    return jwtDecode(jwt);
  } catch {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getJwt,
  fetchRoles,
};

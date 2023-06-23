import axios from "axios";
import { MDBToast } from "mdbreact";

// Store imports
import store from "../store/store";
import { finishLoading, startLoading } from "../store/LoadingSlice";
import { logout } from "../store/auth/AuthThunk";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
});

const axiosAdminInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/admin`,
});

const axiosAirStuffInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AIRTABLE_BASE_URL}/${process.env.REACT_APP_AIRTABLE_STUFF_APP_ID}`,
  headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}` },
});

axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    return config;
  },
  (error) => {
    store.dispatch(finishLoading());
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(finishLoading());
    return response;
  },
  (error) => {
    store.dispatch(finishLoading());
    return handleError(error);
  }
);

axiosAdminInstance.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    return config;
  },
  (error) => {
    store.dispatch(finishLoading());
    return Promise.reject(error);
  }
);

axiosAdminInstance.interceptors.response.use(
  (response) => {
    store.dispatch(finishLoading());
    return response;
  },
  (error) => {
    store.dispatch(finishLoading());
    return handleError(error);
  }
);

axiosAirStuffInstance.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    return config;
  },
  (error) => {
    store.dispatch(finishLoading());
    return Promise.reject(error);
  }
);

axiosAirStuffInstance.interceptors.response.use(
  (response) => {
    store.dispatch(finishLoading());
    return response;
  },
  (error) => {
    store.dispatch(finishLoading());
    return handleError(error);
  }
);

function setJwt(jwt) {
  axiosInstance.defaults.headers.common["x-auth-token"] = jwt;
  axiosAdminInstance.defaults.headers.common["x-auth-token"] = jwt;
}

function apiBaseUrl() {
  return `${process.env.REACT_APP_API_BASE_URL}/api`;
}

function adminBaseUrl() {
  return `${process.env.REACT_APP_API_BASE_URL}/admin`;
}

function getErrorMessage(error) {
  if (
    error.response &&
    error.response.data &&
    error.response.data.messages &&
    Array.isArray(error.response.data.messages) &&
    error.response.data.messages.length
  )
    return error.response.data.messages[0];
  return "An unexpected error occurrred.";
}

function handleError(error) {
  const unauthorisedError = error.response && error.response.status === 401;

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (unauthorisedError) {
    MDBToast.error("Session expired, login again.");
    store.dispatch(logout());
  }

  if (!expectedError) {
    console.log(error);
    MDBToast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
}

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  adminGet: axiosAdminInstance.get,
  adminPost: axiosAdminInstance.post,
  adminPut: axiosAdminInstance.put,
  adminDelete: axiosAdminInstance.delete,
  stuffGet: axiosAirStuffInstance.get,
  setJwt,
  apiBaseUrl,
  adminBaseUrl,
  getErrorMessage,
};

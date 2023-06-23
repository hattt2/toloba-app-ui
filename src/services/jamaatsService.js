import http from "./httpService";

const apiEndpoint = "/logos";

function fetchJamaatList(offset) {
  return http.stuffGet(
    `${apiEndpoint}?view=logos${offset ? `&offset=${offset}` : ""}`
  );
}

export default {
  fetchJamaatList,
};

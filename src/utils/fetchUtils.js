import axios from "axios";

export function getRequest(url, params) {
  return axios({
    method: "GET",
    url,
    params,
  });
}

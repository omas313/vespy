import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logger";

axios.interceptors.response.use(null, error => {
  const isExpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!isExpectedError) {
    logger.log(error);
    toast.error("Unexpcted error");
  }

  return Promise.reject(error);
});

const setToken = token =>
  (axios.defaults.headers.common["x-auth-token"] = token);

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setToken,
};

export default http;

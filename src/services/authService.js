import http from "./http";
import { apiEnpoint } from "../config.json";

const apiUrl = `${apiEnpoint}/auth`;

export const login = (email, password) =>
  http.post(apiUrl, { email, password });

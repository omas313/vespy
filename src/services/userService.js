import http from "./http";
import { apiEnpoint } from "../config.json";

const apiUrl = `${apiEnpoint}/users`;

export const register = user => http.post(apiUrl, user);

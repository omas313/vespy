import http from "./http";

const apiUrl = "/users";

export const register = user => http.post(apiUrl, user);

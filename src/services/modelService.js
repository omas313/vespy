import http from "./http";

export const getModels = () => http.get("/models");

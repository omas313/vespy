import http from "./http";
import { apiEnpoint } from "../config.json";

export const getModels = () => http.get(`${apiEnpoint}/models`);

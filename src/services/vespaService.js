import http from "./http";
import { apiEnpoint } from "../config.json";

export const getVespe = () => http.get(`${apiEnpoint}/vespe`);

export const deleteVespa = id => http.delete(`${apiEnpoint}/vespe/${id}`);

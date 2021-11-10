import http from "./http";

const vespeUrl = "/vespe";
const getVespaUrl = id => `/vespe/${id}`;

export const getVespe = () => http.get(vespeUrl);

export const getVespa = id => http.get(getVespaUrl(id));

export const saveVespa = vespa => {
  const id = vespa._id;
  const data = { ...vespa };
  delete data._id;

  if (id === "") return http.post(vespeUrl, data);

  return http.put(getVespaUrl(id), data);
};

export const deleteVespa = id => http.delete(getVespaUrl(id));

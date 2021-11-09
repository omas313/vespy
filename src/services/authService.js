import http from "./http";
import { apiEnpoint } from "../config.json";
import jwtDecode from "jwt-decode";

const apiUrl = `${apiEnpoint}/auth`;
const tokenKey = "token";

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiUrl, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

export const loginWithToken = token => {
  localStorage.setItem(tokenKey, token);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt); // jwtCode throws ex if we pass null
  } catch (ex) {
    return null;
  }
};

const auth = {
  login,
  loginWithToken,
  logout,
  getCurrentUser,
};

export default auth;

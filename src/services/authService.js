import http from "./http";
import jwtDecode from "jwt-decode";

const apiUrl = "/auth";
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

export const getToken = () => localStorage.getItem(tokenKey);

http.setToken(getToken());

const auth = {
  login,
  loginWithToken,
  logout,
  getCurrentUser,
};

export default auth;

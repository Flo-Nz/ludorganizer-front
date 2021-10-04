import axios from "axios";
import apiUrl from './api-url';

const register = (username, email, password) => {
  return axios.post(apiUrl + "/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(apiUrl + "/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
import axios from "axios";
import authHeader from "./auth-header";
import apiUrl from './api-url';

const getUserBoard = () => {
  return axios.get(apiUrl + "/user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(apiUrl + "/admin", { headers: authHeader() });
};

export default {
  getUserBoard,
  getAdminBoard
};
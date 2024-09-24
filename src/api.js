import axios from "axios";

const accessToken = localStorage.getItem("access_token");

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default api;

// api.js
import axios from "axios";

// Create an instance of axios with token
const accessToken = localStorage.getItem("access_token");

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default api;

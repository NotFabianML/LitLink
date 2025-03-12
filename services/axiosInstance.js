import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Asegúrate de que coincida con tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

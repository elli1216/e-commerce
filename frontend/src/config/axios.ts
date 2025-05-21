import axios from "axios";

// Determine if we're running on localhost or ngrok
const isNgrok = window.location.origin.includes("ngrok");

export const axiosInstance = axios.create({
  baseURL: isNgrok
    ? "http://localhost:3000/api" // When accessed via ngrok
    : "http://localhost:3000/api", // When accessed via localhost
  withCredentials: true,
});

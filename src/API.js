import axios from "axios";
const serverUrl = process.env.REACT_APP_BACKEND_URL;
const API = axios.create({
  baseURL: serverUrl,
});

API.interceptors.request.use((req) => {
  return req;
});

export default API;

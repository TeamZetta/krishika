import axios, { AxiosInstance } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});
export default api;

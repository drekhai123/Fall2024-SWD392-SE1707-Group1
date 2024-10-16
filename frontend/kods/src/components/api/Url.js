import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const baseUrl = "https://kdosdreapiservice.azurewebsites.net/api";
const localhostUrl = "http://localhost:2377/api";

const headers = {
  "Content-Type": "application/json",
  // Add headers such as Authorization if required
  // 'Authorization': 'Bearer your-token',
};

const axiosClient = axios.create({
  baseURL: baseUrl,
  timeout: 8000,
});

export { headers, baseUrl, localhostUrl , axiosClient};

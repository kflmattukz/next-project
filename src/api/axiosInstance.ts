import axios from "axios";

const PATH_URL = "https://reqres.in/api/";
export const reqresApi = axios.create({
  baseURL: PATH_URL,
  timeout: 1000,
});

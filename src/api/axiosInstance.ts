import axios from "axios";

const PATH_URL = "https://reqres.in/api/";
const reqresApi = axios.create({
  baseURL: PATH_URL,
});

reqresApi.interceptors.request.use(
  (config) => Promise.resolve(config),
  (err) => Promise.reject(err)
);
reqresApi.interceptors.response.use(
  (data: any) => Promise.resolve(data),
  (err: any) => Promise.reject(err)
);

export default reqresApi;

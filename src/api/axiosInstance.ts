import axios from "axios";

//"https://reqres.in/api/"
const PATH_URL = process.env.NEXT_PUBLIC_API_REQRES_BASE_URL;
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

import reqresApi from "./axiosInstance";

type RegisterLoginProps = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export async function register(data: RegisterLoginProps) {
  const res = await reqresApi.post("api/register", { ...data });
  if (res) {
    return res.data;
  }

  return new Error("Something went wrong !, please try again later...");
}

export async function login(data: { email: string; password: string }) {
  const res = await reqresApi.post("api/login", { ...data });
  if (res) {
    return res.data;
  }

  return new Error("Sometime went wrong !, please try again later...");
}

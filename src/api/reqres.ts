import { LoginProps, RegisterProps } from "@/constant/interface";
import reqresApi from "./axiosInstance";

export async function register(data: RegisterProps) {
  const res = await reqresApi.post("api/register", { ...data });
  if (res) {
    return res.data;
  }

  return new Error("Something went wrong !, please try again later...");
}

export async function login(data: LoginProps) {
  const res = await reqresApi.post("api/login", { ...data });
  if (res) {
    return res.data;
  }

  return new Error("Sometime went wrong !, please try again later...");
}

export async function fetchUser() {
  try {
    const res = await reqresApi.get("users?delay=2");
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    return new Error("Sometime went wrong !, please try again later...");
  }
}

import { LoginProps, RegisterProps } from "@/constant/interface";
import reqresApi from "./axiosInstance";
import { notification } from "antd";

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

export async function mutationAddUser(data: any) {
  try {
    const res = await reqresApi.post("users?delay=1", { ...data });
    if (res.status === 201) {
      return res.data;
    }
  } catch (err) {
    return new Error("Sometime went wrong !, please try again later...");
  }
}

export async function mutationRemoveUser(id: string) {
  try {
    const res = await reqresApi.delete(`users/${id}?delay=1`);
    if (res.status === 204) {
      return res.data;
    }
  } catch (err) {
    return new Error("Sometime went wrong !, please try again later...");
  }
}

export async function mutationEditUser(data: any) {
  try {
    const res = await reqresApi.patch(`users/${data.id}?delay=1`, { ...data });
    if (res.status === 204) {
      return res.data;
    } else {
      return notification.error({
        message:
          "Load list user error, please refresh the page in view second..",
        placement: "topRight",
      });
    }
  } catch (err) {
    return new Error("Sometime went wrong !, please try again later...");
  }
}

import { useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/constant/interface";

export default function useGetUserLogin() {
  const [user, setUser] = useState<User | undefined>(
    JSON.parse(Cookies.get("User") || JSON.stringify(""))
  );

  return { user, setUser };
}

import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { User } from "@/constant/interface";

export default function useGetUserLogin() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    console.log(cookies.get("User"));
    if (!user) {
      setUser(
        JSON.parse(cookies.get("User") || JSON.stringify("")) || undefined
      );
    }
  }, [user]);

  return { user, setUser };
}

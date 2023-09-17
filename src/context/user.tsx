"use client";

import type { User } from "@/constant/interface";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import Cookies from "js-cookie";

const userCookie = Cookies.get("User") || undefined;
const userLocal: User | undefined = userCookie
  ? JSON.parse(userCookie)
  : undefined;

interface UserContextProp {
  user: User | undefined;
  setUserContext: Dispatch<SetStateAction<{ user: User | undefined }>>;
}

const UserContext = createContext<UserContextProp>({
  user: {
    id: undefined,
    email: "",
    createdAt: "",
  },
  setUserContext: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUserContext] = useState<{ user: User | undefined }>({
    user: userLocal ? userLocal : undefined,
  });
  return (
    <UserContext.Provider value={{ ...user, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

"use client";
import Cookies from "js-cookie";
// import { usePathname } from "next/navigation";

export default function CheckUserLogin() {
  const user = Cookies.get("User") || undefined;
  // const path = usePathname();
  if (!user) {
  }
}

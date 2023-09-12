"use client";

import React from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_PATH, PROTECTED_PATH } from "@/constant/path";

function authRoute(route: string, routes: string[]): boolean {
  return routes.includes(route);
}

function privateRoute(route: string, routes: string[]): boolean {
  return routes.includes(route);
}

function WithPrivateRoute(WrappedComponent: any) {
  // const user = Cookies.get("User") || undefined;
  // const path = usePathname();
  // const router = useRouter();
  // if (user && authRoute(path, AUTH_PATH)) {
  //   router.push("/");
  // }

  const user = "helo";

  // if (!user && privateRoute(path, PROTECTED_PATH)) {
  //   router.push("/login");
  // }
  const ComponentWithRoute = (props: any) => {
    return <WrappedComponent {...props} />;
  };

  return ComponentWithRoute(user);
}

export default WithPrivateRoute;

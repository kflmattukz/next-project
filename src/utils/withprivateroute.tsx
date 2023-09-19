/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { AUTH_PATH, PROTECTED_PATH } from "@/constant/path";
import { useUserContext } from "@/context/user";
import useGetUserLogin from "@/hooks/useGetUserLogin";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 *
 * @param WrappedComponent
 * @returns
 * Component with additonal props auth
 * and checking of authentication
 */

function isProtectedPath(path: string, protectedPaths: string[]) {
  return protectedPaths.includes(path);
}

function isAuthPath(path: string, authPaths: string[]) {
  return authPaths.includes(path);
}

export default function withPrivateRoute(WrappedComponent: any) {
  return (props: any) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useUserContext();

    useEffect(() => {
      if (!user && isProtectedPath(pathname, PROTECTED_PATH)) {
        router.replace("/login");
        return;
      }

      if (user && isAuthPath(pathname, AUTH_PATH)) {
        router.replace("/");
        return;
      }
    }, []);

    if (!user && isProtectedPath(pathname, PROTECTED_PATH)) {
      return null;
    }

    if (user && isAuthPath(pathname, AUTH_PATH)) {
      return null;
    }
    return <WrappedComponent {...props} auth={user} />;
  };
}

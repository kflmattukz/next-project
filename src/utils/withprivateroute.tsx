/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import useGetUserLogin from "@/hooks/useGetUserLogin";
import cookie from "js-cookie";
import { useContext, useEffect } from "react";

/**
 *
 * @param WrappedComponent
 * @returns
 * Component with additonal props auth
 * and checking of authentication
 */
export default function withPrivateRoute(WrappedComponent: any) {
  return (props: any) => {
    const { user } = useGetUserLogin();
    return <WrappedComponent {...props} auth={user} />;
  };
}

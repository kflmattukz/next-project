import { login } from "@/api/reqres";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

export function useLogin() {
  const fetchLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      notification.success({
        message: "Login Success",
        placement: "topRight",
      });
    },
  });

  const onLogin = (username: string, password: string) => {
    fetchLogin.mutateAsync({ email: username, password });
  };

  return {
    fetchLogin,
    onLogin,
  };
}

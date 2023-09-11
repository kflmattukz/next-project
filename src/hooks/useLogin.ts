import { login } from "@/api/reqres";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

function useLogin() {
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
    loginLoading: fetchLogin.isLoading,
    loginSuccess: fetchLogin.isSuccess,
    loginData: fetchLogin.data,
    onLogin,
  };
}

export default useLogin;

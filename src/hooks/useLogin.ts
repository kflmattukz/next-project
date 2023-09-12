import { login } from "@/api/reqres";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function useLogin() {
  const router = useRouter();
  const fetchLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (user) => {
      Cookies.set("User", JSON.stringify(user));
      notification.success({
        message: "Login Success",
        placement: "topRight",
      });

      router.replace("/");
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

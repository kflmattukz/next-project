import { login } from "@/api/reqres";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/user";

function useLogin() {
  const { setUserContext } = useUserContext();
  const router = useRouter();
  const fetchLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (user) => {
      Cookies.set("User", JSON.stringify(user), { secure: true });
      setUserContext({ user: user });
      notification.success({
        message: "Login Success",
        placement: "topRight",
      });

      return router.push("/");
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

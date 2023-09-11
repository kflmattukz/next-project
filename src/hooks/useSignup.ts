import { register } from "@/api/reqres";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

type RegisterLoginProps = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

function useSignup() {
  const mutationSignup = useMutation({
    mutationKey: ["signup"],
    mutationFn: register,
    onSuccess: () => {
      notification.success({
        message: "Signup success",
        placement: "topRight",
      });
    },
  });

  const onSignup = (formData: RegisterLoginProps) => {
    mutationSignup.mutateAsync(formData);
  };

  return { mutationSignup, onSignup };
}

export default useSignup;

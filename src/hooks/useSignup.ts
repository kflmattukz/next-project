import { register } from "@/api/reqres";
import { RegisterProps } from "@/constant/interface";
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

  const onSignup = (formData: RegisterProps) => {
    mutationSignup.mutateAsync(formData);
  };

  return { mutationSignup, onSignup };
  // return [mutationSignup, onSignup]
}

export default useSignup;

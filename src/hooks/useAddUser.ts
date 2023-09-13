import { mutationAddUser } from "@/api/reqres";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

export default function useAddUser() {
  const mutateAddUser = useMutation({
    mutationKey: ["adduser"],
    mutationFn: mutationAddUser,
    onSuccess: () => {
      notification.success({
        message: "Add user success",
        placement: "topRight",
      });
    },
  });

  const onSubmitAddUser = (data: any) => {
    mutateAddUser.mutateAsync(data);
  };

  return {
    mutateAddUser,
    onSubmitAddUser,
  };
}

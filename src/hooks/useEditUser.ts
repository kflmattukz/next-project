import { mutationEditUser } from "@/api/reqres";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

export default function useEditUser() {
  const mutateEditUser = useMutation({
    mutationKey: ["updateWithId"],
    mutationFn: mutationEditUser,
    onSuccess: () => {
      notification.success({
        message: "Remove user success",
        placement: "topRight",
      });
    },
  });

  const onEditUser = (id: number, data: any) => {
    mutateEditUser.mutateAsync({ id, data });
  };

  return {
    mutateEditUser,
    onEditUser,
  };
}

import { mutationEditUser } from "@/api/reqres";
import type { ListUser } from "@/constant/interface";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

export default function useEditUser() {
  const mutateEditUser = useMutation({
    mutationKey: ["updateWithId"],
    mutationFn: mutationEditUser,
    onSuccess: () => {
      notification.success({
        message: "Update user success",
        placement: "topRight",
      });
    },
  });

  const onEditUser = (id: number, data: ListUser) => {
    mutateEditUser.mutateAsync({ id, data });
  };

  return {
    mutateEditUser,
    onEditUser,
  };
}

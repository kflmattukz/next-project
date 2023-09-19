import { mutationRemoveUser } from "@/api/reqres";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

export default function useRemoveUser() {
  const mutateRemoveUser = useMutation({
    mutationKey: ["removeWithId"],
    mutationFn: mutationRemoveUser,
    onSuccess: () => {
      notification.success({
        message: "Remove user success",
        placement: "topRight",
      });
    },
  });

  const onRemoveUser = async (id: number) => {
    await mutateRemoveUser.mutateAsync(String(id));
  };

  return {
    mutateRemoveUser,
    onRemoveUser,
  };
}

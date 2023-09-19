import { ListUser } from "@/constant/interface";
import useRemoveUser from "@/hooks/useRemoveUser";
import { Button, Card, Col, Modal, Space, notification } from "antd";
import { useEffect } from "react";

interface CardListProps {
  item: ListUser;
  removeUserById: (id: number) => void;
  openModalEdit: (id: number) => void;
}

const { confirm } = Modal;

export default function CardList({
  item,
  removeUserById,
  openModalEdit,
}: CardListProps) {
  const { mutateRemoveUser, onRemoveUser } = useRemoveUser();
  const {
    isLoading: isRemoveUserLoading,
    isSuccess: isRemoveUserSuccess,
    isError: isRemoveUserError,
  } = mutateRemoveUser;

  const handleRemoveUser = async (id: number) => {
    confirm({
      content: `Apakah anda yakin akan menhapus user dengan id: ${id}`,
      okButtonProps: {
        type: "text",
        className: "bg-red-600 text-white font-semibold hover:text-white",
        style: { color: "white", backgroundColor: "#F00" },
      },
      okType: "danger",
      cancelText: "Tutup",
      okText: `Hapus user ${id}`,
      async onOk() {
        await onRemoveUser(id);
      },
    });
  };

  useEffect(() => {
    if (isRemoveUserSuccess) {
      removeUserById(item.id);
    }
  }, [isRemoveUserSuccess]);

  useEffect(() => {
    if (isRemoveUserError) {
      notification.error({
        message: "Something went wrong, please try again later",
        placement: "topRight",
      });
    }
  }, [isRemoveUserError]);

  return (
    <Col key={item.id} span={24} sm={24} lg={8}>
      <Card
        title={item.email || ""}
        size="small"
        extra={
          <Space.Compact>
            <Button
              size="small"
              onClick={() => openModalEdit(item.id)}
              className="text-sm text-white py-1 px-3 bg-blue-600 hover:bg-blue-600/75 duration-300"
            >
              edit
            </Button>
            <Button
              onClick={() => handleRemoveUser(item.id)}
              size="small"
              className="text-sm text-white py-1 px-3 bg-red-600 hover:bg-red-600/75 duration-300"
            >
              Remove
            </Button>
          </Space.Compact>
        }
      >
        <p>{`${item.first_name} ${item.last_name}`}</p>
        <p>{item.email}</p>
      </Card>
    </Col>
  );
}

"use client";

import Nav from "@/components/Nav";
import { ListUser, User } from "@/constant/interface";
import { useUserContext } from "@/context/user";
import useEditUser from "@/hooks/useEditUser";
import useGetList from "@/hooks/useGetList";
import useRemoveUser from "@/hooks/useRemoveUser";
import withPrivateRoute from "@/utils/withprivateroute";
import { Button, Col, Divider, Layout, Modal, Row } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import ModalUser from "./ModalUser";
import CardList from "./CardList";
import type { ModalUserProps } from "./ModalUser";

const { Content } = Layout;

function Home() {
  const { user } = useUserContext();
  const refModalUser = useRef<ModalUserProps | null>(null);
  const [userLogin, setUserLogin] = useState<User | undefined>(undefined);
  const { getListData, getListIsError, getListIsLoading, getListSuccess } =
    useGetList(user ? true : false);

  const [listUser, setListUser] = useState(getListData);

  const memoListUser = useMemo(() => listUser || [], [listUser]);
  const { mutateRemoveUser, onRemoveUser } = useRemoveUser();
  const { mutateEditUser, onEditUser } = useEditUser();

  const {
    isLoading: isRemoveUserLoading,
    isSuccess: isRemoveUserSuccess,
    isError: isRevemoUserError,
    data: removeUserData,
  } = mutateRemoveUser;

  const {
    isLoading: isUpdateUserLoading,
    isSuccess: isUpdateUserSuccess,
    isError: isUpdateUserError,
    data: updateUserData,
  } = mutateEditUser;

  const handleRemoveUser = (id: number) => {
    return Modal.confirm({
      content: `Apakah anda yakin akan menhapus user dengan id: ${id}`,
      okButtonProps: {
        type: "text",
        className: "bg-red-600 text-white font-semibold hover:text-white",
        style: { color: "white", backgroundColor: "#F00" },
      },
      okText: `Hapus user ${id}`,
      onOk: async () => {
        onRemoveUser(id);
        console.log(removeUserData);
        setListUser((users: any) =>
          users.filter((user: any) => user.id !== id)
        );
      },
    });
  };

  useEffect(() => {
    if (getListSuccess) {
      setListUser(getListData);
    }
  }, [getListSuccess, getListData]);

  useEffect(() => {
    setUserLogin(user);
  }, [user]);

  return (
    <>
      <Nav />
      <Content className="w-3/4 mx-auto mt-5">
        {!userLogin ? (
          ""
        ) : (
          <>
            <Button
              size="large"
              onClick={() => refModalUser.current?.onModalOpen(true)}
              className="font-semibold text-gray-600 hover:text-gray-100 duration-300"
            >
              Add user
            </Button>
            <Divider />
          </>
        )}

        <Row gutter={[8, 8]} wrap>
          {!userLogin ? (
            <Col span={6}>
              <h1>Please login first</h1>
            </Col>
          ) : getListIsLoading ? (
            <h2>Loading....</h2>
          ) : (
            memoListUser?.map((item: ListUser, idx: number) => {
              return <CardList item={item} key={`${item.id}-${idx}`} />;
            })
          )}
        </Row>
        <ModalUser ref={refModalUser} title="Hello this is title" />
      </Content>
    </>
  );
}

export default withPrivateRoute(Home);

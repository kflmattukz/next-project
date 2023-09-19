"use client";

import Nav from "@/components/Nav";
import { ListUser, User } from "@/constant/interface";
import { useUserContext } from "@/context/user";
import useGetList from "@/hooks/useGetList";
import withPrivateRoute from "@/utils/withprivateroute";
import { Button, Col, Divider, Layout, Row } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ModalUser from "./ModalUser";
import CardList from "./CardList";
import type { ModalUserProps } from "./ModalUser";

const { Content } = Layout;

function Home() {
  const { user } = useUserContext();
  const refModalUser = useRef<ModalUserProps | null>(null);
  let [userEdit, setUserEdit] = useState<ListUser | undefined>(undefined);
  const [userLogin, setUserLogin] = useState<User | undefined>(undefined);
  const { getListData, getListIsError, getListIsLoading, getListSuccess } =
    useGetList(user ? true : false);

  const [listUser, setListUser] = useState(getListData);

  const memoListUser = useMemo(() => listUser || [], [listUser]);

  const handleAddList = useCallback((data: ListUser) => {
    setListUser((prevData: ListUser[]) => [data, ...prevData]);
  }, []);

  const handleUpdateList = useCallback((id: number, data: ListUser) => {
    setListUser((prevData: ListUser[]) =>
      prevData.map((user: ListUser) => {
        if (id === user.id) {
          return {
            ...user,
            id: id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            color: data.color,
          };
        }
        return user;
      })
    );
  }, []);

  const handleRemoveUserById = useCallback((id: number) => {
    setListUser((prevData: ListUser[]) =>
      prevData.filter((user: ListUser) => user.id !== id)
    );
  }, []);

  const handleUpdateUser = useCallback(
    (id: number) => {
      const edit = listUser.filter((user: ListUser) => user.id === id)[0];
      setUserEdit(edit);
      refModalUser.current?.onModalOpen(true);
    },
    [listUser]
  );

  const handleCancelEdit = useCallback(() => {
    setUserEdit(undefined);
  }, []);

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
              return (
                <CardList
                  item={item}
                  key={`${item.id}-${idx}`}
                  removeUserById={handleRemoveUserById}
                  openModalEdit={handleUpdateUser}
                />
              );
            })
          )}
        </Row>
        <ModalUser
          ref={refModalUser}
          title={userEdit ? "Update List User" : "Add List User"}
          addUserList={handleAddList}
          updateUserList={handleUpdateList}
          isEdit={userEdit}
          handleCancelEdit={handleCancelEdit}
        />
      </Content>
    </>
  );
}

export default withPrivateRoute(Home);

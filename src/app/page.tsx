"use client";

import ModalForm from "@/components/ModalForm";
import Nav from "@/components/Nav";
// import Nav from "@/components/Nav";
import { ListUser, User } from "@/constant/interface";
import { useUserContext } from "@/context/user";
import useAddUser from "@/hooks/useAddUser";
import useEditUser from "@/hooks/useEditUser";
import useGetList from "@/hooks/useGetList";
import useGetUserLogin from "@/hooks/useGetUserLogin";
import useRemoveUser from "@/hooks/useRemoveUser";
import withPrivateRoute from "@/utils/withprivateroute";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useMemo, useState } from "react";

const { Content } = Layout;

function Home() {
  const [form] = useForm();
  const { user } = useUserContext();
  const [userLogin, setUserLogin] = useState<User | undefined>(undefined);
  const [isAddOpen, setAddOpen] = useState<boolean>(false);
  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const { getListData, getListIsError, getListIsLoading, getListSuccess } =
    useGetList(user ? true : false);

  const [userEdit, setUserEdit] = useState<ListUser | undefined>(undefined);

  const [listUser, setListUser] = useState(getListData);

  const memoListUser = useMemo(() => listUser, [listUser]);
  const { mutateAddUser, onSubmitAddUser } = useAddUser();
  const { mutateRemoveUser, onRemoveUser } = useRemoveUser();
  const { mutateEditUser, onEditUser } = useEditUser();

  const {
    isLoading: isAddUserLoading,
    isSuccess: isAddUserSuccess,
    isError: isAddUserError,
    data: addUserData,
  } = mutateAddUser;

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

  const onFinishAdd = (value: any) => {
    onSubmitAddUser(value);
  };

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

  function CardList(items: ListUser[]) {
    return items.map((item) => {
      return (
        <Col key={item.id} span={24} sm={24} lg={8}>
          <Card
            title={item.email || ""}
            size="small"
            extra={
              <Space.Compact>
                <Button
                  size="small"
                  onClick={() => {
                    setUserEdit((_) => item);
                    setEditOpen(true);
                  }}
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
    });
  }

  function handleAddUserFinish(value: ListUser) {
    onSubmitAddUser(value);
    setAddOpen(false);
  }

  function handleEditUserFinish(value: ListUser) {
    // onEditUser( value);
    setAddOpen(false);
  }

  function ModalFormAddUser() {
    return (
      <ModalForm
        title="Add User"
        isOpen={isAddOpen}
        handleCancel={setAddOpen}
        handleFinish={handleAddUserFinish}
        handleFinishEdit={handleEditUserFinish}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item<ListUser>
              name="first_name"
              label="First name"
              rules={[
                {
                  required: true,
                  message: "First name is required, plese input first name",
                },
                {
                  min: 3,
                  message: "First name must have minimal 3 charaters long",
                },
                {
                  max: 50,
                  message: "First name maximal 50 characters long",
                },
              ]}
            >
              <Input type="text" placeholder="First name ex. John" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ListUser>
              name="last_name"
              label="Last name"
              rules={[
                {
                  required: true,
                  message: "Last name is required, plese input last name",
                },
                {
                  min: 3,
                  message: "Last name must have minimal 3 charaters long",
                },
                {
                  max: 50,
                  message: "Last name maximal 50 characters long",
                },
              ]}
            >
              <Input type="text" placeholder="Last name ex. Doe" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ListUser>
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                  message: "Email is required, plese input email",
                },
              ]}
            >
              <Input type="text" placeholder="Email ex. yourname@***.com" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item<ListUser> name="color" label="Color">
              <Input type="text" placeholder="put a color name or hex color" />
            </Form.Item>
          </Col>
        </Row>
      </ModalForm>
    );
  }

  function ModalEditUser(userData: ListUser | undefined) {
    form.setFieldsValue(userData);
    return (
      <Modal
        footer={
          <>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button
              htmlType="submit"
              className="bg-green-500 text-white border-none hover:text-gray-600"
              style={{ color: "white" }}
              loading={isUpdateUserLoading}
              onClick={form.submit}
            >
              Finish
            </Button>
          </>
        }
        title={
          <Typography.Title level={4} style={{ margin: 0, padding: 0 }}>
            Edit User
          </Typography.Title>
        }
        open={isEditOpen}
        destroyOnClose
        onCancel={() => setEditOpen(false)}
      >
        <Divider plain style={{ margin: 0, marginBottom: "15px" }} />
        <Form form={form} layout="vertical" onFinish={onFinishAdd}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item<ListUser>
                name="first_name"
                label="First name"
                rules={[
                  {
                    required: true,
                    message: "First name is required, plese input first name",
                  },
                  {
                    min: 3,
                    message: "First name must have minimal 3 charaters long",
                  },
                  {
                    max: 50,
                    message: "First name maximal 50 characters long",
                  },
                ]}
              >
                <Input type="text" placeholder="First name ex. John" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<ListUser>
                name="last_name"
                label="Last name"
                rules={[
                  {
                    required: true,
                    message: "Last name is required, plese input last name",
                  },
                  {
                    min: 3,
                    message: "Last name must have minimal 3 charaters long",
                  },
                  {
                    max: 50,
                    message: "Last name maximal 50 characters long",
                  },
                ]}
              >
                <Input type="text" placeholder="Last name ex. Doe" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<ListUser>
                name="email"
                label="email"
                rules={[
                  {
                    required: true,
                    message: "Email is required, plese input email",
                  },
                ]}
              >
                <Input type="text" placeholder="Email ex. yourname@***.com" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item<ListUser> name="color" label="Color">
                <Input
                  type="text"
                  placeholder="put a color name or hex color"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }

  useEffect(() => {
    if (getListSuccess) {
      setListUser(getListData);
    }
  }, [getListSuccess, getListData]);

  useEffect(() => {
    if (isAddUserSuccess) {
      setListUser((users: any) => [addUserData, ...users]);
      setAddOpen(false);
    }
  }, [isAddUserSuccess, addUserData]);

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
              onClick={() => setAddOpen(true)}
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
            CardList(memoListUser || [])
          )}
        </Row>
        {ModalFormAddUser()}
        {ModalEditUser(userEdit)}
      </Content>
    </>
  );
}

export default withPrivateRoute(Home);

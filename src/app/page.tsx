"use client";

import Nav from "@/components/Nav";
import { ListUser, User } from "@/constant/interface";
import useAddUser from "@/hooks/useAddUser";
import useGetList from "@/hooks/useGetList";
import useGetUserLogin from "@/hooks/useGetUserLogin";
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
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";

const { Content } = Layout;

export default function Home() {
  const [form] = useForm();
  const { user, setUser } = useGetUserLogin();
  // const [user, setUser] = useState<User | undefined>(undefined);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { getListData, getListIsError, getListIsLoading, getListSuccess } =
    useGetList(user ? true : false);

  const [listUser, setListUser] = useState(getListData);

  const memoListUser = useMemo(() => listUser, [listUser]);
  const { mutateAddUser, onSubmitAddUser } = useAddUser();

  const { isLoading, isSuccess, isError, data } = mutateAddUser;

  const onFinish = (value: any) => {
    onSubmitAddUser(value);
  };

  const handleRemoveUser = (id: number) => {
    Modal.confirm({
      content: `Apakah anda yakin akan menhapus user dengan id: ${id}`,
      okButtonProps: { type: "text" },
      okText: `Hapus user ${id}`,
      onOk: () => {
        setListUser((users: any) =>
          users.filter((user: any) => user.id !== id)
        );
        return notification.success({
          message: `Hapus user dengan id ${id} success`,
          placement: "topRight",
        });
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
                  className="text-sm text-white py-1 px-3 bg-blue-600 hover:bg-blue-600/75 duration-300"
                >
                  detail
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

  function ModalAddUser() {
    return (
      <Modal
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              htmlType="submit"
              className="bg-green-500 text-white border-none hover:text-gray-600"
              style={{ color: "white" }}
              loading={isLoading}
              onClick={form.submit}
            >
              Finish
            </Button>
          </>
        }
        title={
          <Typography.Title level={4} style={{ margin: 0, padding: 0 }}>
            Add User
          </Typography.Title>
        }
        open={isOpen}
        destroyOnClose
        onCancel={() => setOpen(false)}
      >
        <Divider plain style={{ margin: 0, marginBottom: "15px" }} />
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item
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
              <Form.Item
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
              <Form.Item
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
              <Form.Item name="color" label="Color">
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
    setUser(JSON.parse(Cookies.get("User") || JSON.stringify("")));
  }, [user, setUser]);

  useEffect(() => {
    if (getListSuccess) {
      setListUser(getListData);
    }
  }, [getListSuccess, getListData]);

  useEffect(() => {
    if (getListIsError) {
      notification.error({
        message:
          "Load list user error, please refresh the page in view second..",
        placement: "topRight",
      });
    }
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setListUser((users: any) => [...users, data]);
      form.resetFields();
      setOpen(false);
    }
  }, [isSuccess, data, form]);

  return (
    <>
      <Nav />
      <Content className="w-3/4 mx-auto mt-5">
        {!user ? (
          ""
        ) : (
          <>
            <Button
              size="large"
              onClick={() => setOpen(true)}
              className="font-semibold text-gray-600 hover:text-gray-100 duration-300"
            >
              Add user
            </Button>
            <Divider />
          </>
        )}

        <Row gutter={[8, 8]} wrap>
          {!user ? (
            <Col span={6}>
              <h1>Please login first</h1>
            </Col>
          ) : getListIsLoading ? (
            <h2>Loading....</h2>
          ) : (
            CardList(memoListUser || [])
          )}
        </Row>
        {ModalAddUser()}
      </Content>
    </>
  );
}

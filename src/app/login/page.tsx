"use client";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
  notification,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useForm } from "antd/es/form/Form";
import { useLogin } from "@/hooks/useLogin";
import FormItem from "antd/es/form/FormItem";
import { useEffect } from "react";

const { Title } = Typography;
export default function Page() {
  const [form] = useForm();
  const { fetchLogin, onLogin } = useLogin();

  const { isLoading, isSuccess, data } = fetchLogin;
  function handleSubmit() {
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    onLogin(username, password);
  }

  function handleLoginFailed() {
    notification.error({
      message: "Login failed",
      placement: "topRight",
    });
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [data, isSuccess]);

  return (
    <Layout>
      <Content>
        <Form
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={handleLoginFailed}
        >
          <Row gutter={[10, 5]}>
            <Col span={24}>
              <Title>Signup/Signin</Title>
            </Col>
          </Row>
          <Row gutter={[10, 5]}>
            <Col span={24}>
              <FormItem name="username">
                <Input type="text" placeholder="Username... ex: johndoe" />
              </FormItem>
            </Col>
            <Col span={24}>
              <Input type="password" placeholder="Password... ex: #$(*^#$*" />
            </Col>
            <Col>
              <Button onClick={form.submit} loading={isLoading}>
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Content>
    </Layout>
  );
}

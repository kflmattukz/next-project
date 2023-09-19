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
import useLogin from "@/hooks/useLogin";
import useSignup from "@/hooks/useSignup";
import { useEffect, useState } from "react";
import { LoginProps, RegisterProps } from "@/constant/interface";
import withPrivateRoute from "@/utils/withprivateroute";

const { Title } = Typography;

const Login = () => {
  const [form] = useForm();
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const { loginData, loginLoading, loginSuccess, onLogin } = useLogin();
  const { mutationSignup, onSignup } = useSignup();

  const {
    isLoading: signupIsLoading,
    isSuccess: signupIsSuccess,
    data: signupData,
  } = mutationSignup;

  function handleSubmit(value: LoginProps | RegisterProps) {
    if (formType === "login") {
      onLogin(value.username!, value.password);
    } else {
      onSignup(value as RegisterProps);
      // signupSubmit(value as RegisterProps);
    }
  }

  function handleLoginFailed(value: any) {
    notification.error({
      message: "Login failed",
      description: value.errorFields[0].errors[0],
      placement: "topRight",
    });
  }

  useEffect(() => {
    if (loginSuccess) {
      console.log(loginData);
    }
  }, [loginData, loginSuccess]);

  useEffect(() => {
    if (signupIsSuccess) {
      console.log(signupData);
    }
  }, [signupData, signupIsSuccess]);

  function LoginForm() {
    return (
      <Form
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={handleLoginFailed}
        initialValues={{ remember: true }}
        name="basic"
        labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        layout="vertical"
        className="bg-white py-3 px-5 rounded-xl shadow-md max-w-md"
      >
        <Row gutter={10}>
          <Col span={24}>
            <Title level={3} className="text-center" style={{ color: "#444" }}>
              Login
            </Title>
          </Col>
        </Row>
        <Row gutter={[10, 5]}>
          <Col span={24}>
            <Form.Item<LoginProps>
              name="username"
              label="Username/Email"
              rules={[
                {
                  required: true,
                  message: "Username/email can't be empty",
                },
                {
                  min: 3,
                  message: "Username/email minimal 3 characters",
                },
                {
                  max: 50,
                  message: "Username/email maximal 3 characters long",
                },
              ]}
            >
              <Input type="text" placeholder="Username... ex: johndoe" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<LoginProps>
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password required, please enter your password",
                },
              ]}
            >
              <Input.Password placeholder="Password... ex: #$(*^#$*" />
            </Form.Item>
          </Col>
          <Col>
            <Row className="flex items-baseline space-x-5">
              <Form.Item>
                <Button
                  type="primary"
                  className="bg-blue-600"
                  htmlType="submit"
                  loading={loginLoading}
                >
                  Login
                </Button>
              </Form.Item>
              <Typography.Text>
                Don&apos;t have account yet, Signup{" "}
                <Typography.Link onClick={() => setFormType("signup")}>
                  here
                </Typography.Link>
              </Typography.Text>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }

  function SignupForm() {
    return (
      <Form
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={handleLoginFailed}
        initialValues={{ remember: true }}
        name="basic"
        labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        layout="vertical"
        className="bg-white py-3 px-5 rounded-xl shadow-md max-w-md"
      >
        <Row gutter={10}>
          <Col span={24}>
            <Title level={3} className="text-center" style={{ color: "#444" }}>
              Signup
            </Title>
          </Col>
        </Row>
        <Row gutter={[10, 5]}>
          <Col span={24}>
            <Form.Item<RegisterProps>
              name="firstname"
              label="First name"
              rules={[
                {
                  required: true,
                  message: "First name can't be empty",
                },
                {
                  min: 3,
                  message: "First name minimal 3 characters",
                },
                {
                  max: 50,
                  message: "First name maximal 3 characters long",
                },
              ]}
            >
              <Input type="text" placeholder="First name... ex: John" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<RegisterProps>
              name="lastname"
              label="Last name"
              rules={[
                {
                  required: true,
                  message: "Last name can't be empty",
                },
                {
                  min: 3,
                  message: "Last name minimal 3 characters",
                },
                {
                  max: 50,
                  message: "Last name maximal 3 characters long",
                },
              ]}
            >
              <Input type="text" placeholder="Last name... ex: Doe" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<RegisterProps>
              name="username"
              label="Username/Email"
              rules={[
                {
                  required: true,
                  message: "Username/email can't be empty",
                },
                {
                  min: 3,
                  message: "Username/email minimal 3 characters",
                },
                {
                  max: 50,
                  message: "Username/email maximal 3 characters long",
                },
              ]}
            >
              <Input type="text" placeholder="Username... ex: johndoe" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<RegisterProps>
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password required, please enter your password",
                },
              ]}
            >
              <Input.Password placeholder="Password... ex: #$(*^#$*" />
            </Form.Item>
          </Col>
          <Col>
            <Row className="flex items-baseline space-x-5">
              <Form.Item>
                <Button
                  type="primary"
                  className="bg-blue-600"
                  htmlType="submit"
                  loading={signupIsLoading}
                >
                  Sign up
                </Button>
              </Form.Item>
              <Typography.Text>
                You already have an account, Login{" "}
                <Typography.Link onClick={() => setFormType("login")}>
                  here
                </Typography.Link>
              </Typography.Text>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }

  return (
    <Layout className="h-screen">
      <Content className="flex justify-items-center items-center mx-auto p-5">
        {formType === "login" ? LoginForm() : SignupForm()}
      </Content>
    </Layout>
  );
};

export default withPrivateRoute(Login);

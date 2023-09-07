"use client";
import { Button, Layout, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";
const { Header } = Layout;

export function Nav() {
  return (
    <Layout>
      <Header>
        <nav className="flex justify-between items-center sticky">
          <h2 className="text-white text-xl font-bold">Next Project</h2>
          <div className="links text-white space-x-5">
            <a href="/">Home</a>
            <a href="/">blogs</a>
            <a href="/">About</a>
          </div>
          <div className="actions space-x-2">
            <Button
              type="default"
              icon={<LoginOutlined />}
              className="text-white bg-transparent"
            >
              Login
            </Button>
            <Button type="default" className="text-white bg-transparent">
              Sign up
            </Button>
          </div>
        </nav>
      </Header>
    </Layout>
  );
}

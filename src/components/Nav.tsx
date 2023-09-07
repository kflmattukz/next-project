"use client";
import { Button, Layout, Space } from "antd";
import { SignIn, SignOut } from "@icons";
import { icons } from "antd/es/image/PreviewGroup";
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
          <div className="actions space-x-2 flex">
            <Button
              type="default"
              icon={<SignIn className="w-6 h-6" />}
              className="text-white bg-transparent h-auto flex items-end"
            >
              Sign In
            </Button>
            <Button
              type="default"
              icon={<SignOut className="w-6 h-6" />}
              className="text-white bg-transparent h-auto flex items-end"
            >
              Sign up
            </Button>
          </div>
        </nav>
      </Header>
    </Layout>
  );
}

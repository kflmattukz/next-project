"use client";
import Link from "next/link";
import { Button, Layout } from "antd";
import { SignIn, SignOut } from "@icons";
const { Header } = Layout;

export function Nav() {
  return (
    <Layout>
      <Header>
        <nav className="flex justify-between items-center sticky">
          <h2 className="text-white text-xl font-bold">Next Project</h2>
          <div className="links text-white space-x-5">
            <Link href="/">Home</Link>
            <Link href="/blog">blogs</Link>
            <Link href="/about">About</Link>
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

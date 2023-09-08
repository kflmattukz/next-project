"use client";
import { Button, Layout } from "antd";
import { SignIn } from "@icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

const { Header } = Layout;

export function Nav() {
  const path = usePathname();
  if (path === "/login") return;
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
            <Link href="/login">
              <Button
                type="default"
                icon={<SignIn className="w-6 h-6" />}
                className="text-white bg-transparent h-auto flex items-end"
              >
                Signin | Signup
              </Button>
            </Link>
          </div>
        </nav>
      </Header>
    </Layout>
  );
}

"use client";
import { Button, Layout } from "antd";
import { SignIn, SignOut } from "@icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useGetUserLogin from "@/hooks/useGetUserLogin";

const { Header } = Layout;

export default function Nav() {
  const { user, setUser } = useGetUserLogin();
  // const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(Cookies.get("User") || JSON.stringify("")));
    }
  }, [user, setUser]);

  function handleLogout() {
    Cookies.remove("User");
    setUser(undefined);
    router.push("/");
    router.refresh();
  }

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
            {!user ? (
              <Link href="/login">
                <Button
                  type="default"
                  icon={<SignIn className="w-6 h-6" />}
                  className="text-white bg-transparent h-auto flex items-end"
                >
                  Signin | Signup
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/dashboard">
                  <Button
                    type="default"
                    // icon={<SignIn className="w-6 h-6" />}
                    className="text-white bg-transparent h-auto flex items-end"
                  >
                    {user.email}
                  </Button>
                </Link>
                <Button
                  type="default"
                  icon={<SignOut className="w-6 h-6" />}
                  className="text-white bg-transparent h-auto flex items-end"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </nav>
      </Header>
    </Layout>
  );
}

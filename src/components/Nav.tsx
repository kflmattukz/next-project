"use client";
import { Button, Layout } from "antd";
import { SignIn, SignOut } from "@icons";
import Link from "next/link";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/constant/interface";
import { useUserContext } from "@/context/user";
import { useEffect, useState } from "react";

const { Header } = Layout;

export default function Nav() {
  const { user, setUserContext } = useUserContext();
  const [userLogin, setUserLogin] = useState<User | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    Cookies.remove("User");
    setUserContext({ user: undefined });
    router.refresh();
  }

  useEffect(() => {
    setUserLogin(user);
  }, [user]);

  if (pathname === "/login") return;
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
            {!userLogin ? (
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
                    {userLogin.email}
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

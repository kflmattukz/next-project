"use client";
import { ListUser } from "@/constant/interface";
import useGetList from "@/hooks/useGetList";
import { Button, Card, Divider, Layout, Space } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useMemo } from "react";

const { Content } = Layout;

function Home() {
  const user = Cookies.get("User") || undefined;
  const { getListData, getListIsError, getListIsLoading, getListSuccess } =
    useGetList(user ? true : false);

  const data = useMemo(() => getListData, [getListData]);

  function CardList(items: ListUser[]) {
    return items.map((item, idx) => {
      return (
        <Card
          key={item.id}
          title={item.email || ""}
          size="small"
          extra={
            <Link
              href={`/user/id=${item.id}`}
              className="text-sm font-semibold text-white py-1 px-3 bg-blue-600 hover:bg-blue-600/75 duration-300 ml-1 rounded-md"
            >
              detail
            </Link>
          }
        >
          <p>{`${item.first_name} ${item.last_name}`}</p>
          <p>{item.email}</p>
        </Card>
      );
    });
  }

  return (
    <Content className="w-3/4 mx-auto mt-5">
      <Button className="bg-green-600 hover:bg-green-500 duration-300 text-white hover:text-gray-100">
        Add user
      </Button>
      <Divider />
      <Space
        direction="horizontal"
        size={8}
        style={{ width: "100%", margin: "0 auto" }}
        align="center"
        wrap
      >
        {!user ? (
          <h1>Please login first</h1>
        ) : getListIsLoading ? (
          <h2>Loading....</h2>
        ) : (
          CardList(getListData || [])
        )}
      </Space>
    </Content>
  );
}

export default Home;

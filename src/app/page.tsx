"use client";

import { ListUser, User } from "@/constant/interface";
import useGetList from "@/hooks/useGetList";
import { Button, Card, Col, Divider, Layout, Row, Space } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const { Content } = Layout;

export default function Home() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { getListData, getListIsError, getListIsLoading, getListSuccess } =
    useGetList(user ? true : false);

  function CardList(items: ListUser[]) {
    return items.map((item, idx) => {
      return (
        <Col key={item.id} span={24} sm={24} lg={8}>
          <Card
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
        </Col>
      );
    });
  }

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("User") || JSON.stringify("")));
  }, []);

  return (
    <Content className="w-3/4 mx-auto mt-5">
      {!user ? (
        ""
      ) : (
        <Button
          size="large"
          className="font-semibold text-gray-600 hover:text-gray-100 duration-300"
        >
          Add user
        </Button>
      )}
      <Divider />
      <Row gutter={[8, 8]} wrap>
        {!user ? (
          <Col span={6}>
            <h1>Please login first</h1>
          </Col>
        ) : getListIsLoading ? (
          <h2>Loading....</h2>
        ) : (
          CardList(getListData || [])
        )}
      </Row>
    </Content>
  );
}

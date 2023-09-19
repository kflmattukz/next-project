import { ListUser } from "@/constant/interface";
import { Button, Card, Col, Space } from "antd";

interface CardListProps {
  item: ListUser;
}

export default function CardList({ item }: CardListProps) {
  return (
    <Col key={item.id} span={24} sm={24} lg={8}>
      <Card
        title={item.email || ""}
        size="small"
        extra={
          <Space.Compact>
            <Button
              size="small"
              onClick={() => console.log("open Edit modal")}
              className="text-sm text-white py-1 px-3 bg-blue-600 hover:bg-blue-600/75 duration-300"
            >
              edit
            </Button>
            <Button
              onClick={() => console.log("open remove confirm modal")}
              size="small"
              className="text-sm text-white py-1 px-3 bg-red-600 hover:bg-red-600/75 duration-300"
            >
              Remove
            </Button>
          </Space.Compact>
        }
      >
        <p>{`${item.first_name} ${item.last_name}`}</p>
        <p>{item.email}</p>
      </Card>
    </Col>
  );
}

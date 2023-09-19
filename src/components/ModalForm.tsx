import { Button, Divider, Modal, Typography } from "antd";
import React from "react";

interface ModalFormProps {
  title: string;
  isOpen: boolean;
  isSubmitLoasing: boolean;
  children: React.ReactNode;
  handleCancel: (bool: boolean) => void;
}

export default function ModalForm({
  title,
  isOpen,
  isSubmitLoasing,
  handleCancel,
  children,
}: ModalFormProps) {
  return (
    <Modal
      footer={
        <>
          <Button onClick={() => handleCancel(false)}>Cancel</Button>
          <Button
            htmlType="submit"
            className="bg-green-500 text-white border-none hover:text-gray-600"
            style={{ color: "white" }}
            loading={isSubmitLoasing}
          >
            Finish
          </Button>
        </>
      }
      title={
        <Typography.Title level={4} style={{ margin: 0, padding: 0 }}>
          {title}
        </Typography.Title>
      }
      open={isOpen}
      destroyOnClose
      onCancel={() => handleCancel(false)}
    >
      <Divider plain style={{ margin: 0, marginBottom: "15px" }} />
      {children}
    </Modal>
  );
}

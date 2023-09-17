import { ListUser } from "@/constant/interface";
import { Button, Divider, Form, Modal, Typography, notification } from "antd";

const { useForm } = Form;

interface ModalFormProps<T> {
  title: string;
  isOpen: boolean;
  handleCancel: (value: boolean) => void;
  handleFinish: (value: ListUser) => void;
  handleFinishEdit: (value: ListUser) => void;
  children: React.ReactNode;
  errMsg?: string;
  editData?: T | undefined;
}

export default function ModalForm<T>({
  title,
  isOpen,
  handleCancel,
  handleFinish,
  handleFinishEdit,
  children,
  errMsg = "Something went wrong, please try again later.",
  editData,
}: ModalFormProps<T>) {
  const [form] = useForm();

  if (editData) {
    form.setFieldsValue(editData);
  }

  function onFinish(value: ListUser) {
    if (editData) {
      handleFinishEdit(value);
    } else {
      handleFinish(value);
    }
    form.resetFields();
  }

  function onFinishFailed() {
    notification.error({
      message: `${errMsg}`,
      placement: "topRight",
    });
  }

  return (
    <Modal
      footer={
        <>
          <Button onClick={() => handleCancel(false)}>Cancel</Button>
          <Button
            htmlType="submit"
            className="bg-green-500 text-white border-none hover:text-gray-600"
            style={{ color: "white" }}
            loading={false}
            onClick={form.submit}
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
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {children}
      </Form>
    </Modal>
  );
}

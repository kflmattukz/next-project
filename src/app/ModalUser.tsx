import ModalForm from "@/components/ModalForm";
import { ListUser } from "@/constant/interface";
import useAddUser from "@/hooks/useAddUser";
import { Row, Col, Form, Input } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

export interface ModalUserProps {
  onModalOpen: (bool: boolean) => void;
}

interface Props {
  title: string;
  isEdit?: ListUser;
}

const { useForm } = Form;

const ModalUser = forwardRef<ModalUserProps, Props>(({ title }, ref) => {
  const [form] = useForm();
  const [isOpen, setOpen] = useState<boolean>(false);
  const { mutateAddUser, onSubmitAddUser } = useAddUser();

  const { isLoading: isAddLoading } = mutateAddUser;

  function onModalOpen() {
    setOpen(true);
  }

  function handleFinish(data: ListUser) {
    onSubmitAddUser(data);
  }

  useImperativeHandle(ref, () => ({
    onModalOpen,
  }));

  return (
    <ModalForm
      title={title}
      isOpen={isOpen}
      handleCancel={() => setOpen(false)}
      isSubmitLoasing={isAddLoading}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item<ListUser>
              name="first_name"
              label="First name"
              rules={[
                {
                  required: true,
                  message: "First name is required, plese input first name",
                },
                {
                  min: 3,
                  message: "First name must have minimal 3 charaters long",
                },
                {
                  max: 50,
                  message: "First name maximal 50 characters long",
                },
              ]}
            >
              <Input type="text" placeholder="First name ex. John" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ListUser>
              name="last_name"
              label="Last name"
              rules={[
                {
                  required: true,
                  message: "Last name is required, plese input last name",
                },
                {
                  min: 3,
                  message: "Last name must have minimal 3 charaters long",
                },
                {
                  max: 50,
                  message: "Last name maximal 50 characters long",
                },
              ]}
            >
              <Input type="text" placeholder="Last name ex. Doe" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ListUser>
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                  message: "Email is required, plese input email",
                },
              ]}
            >
              <Input type="text" placeholder="Email ex. yourname@***.com" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item<ListUser> name="color" label="Color">
              <Input type="text" placeholder="put a color name or hex color" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalForm>
  );
});

ModalUser.displayName = "ModalUser";
export default ModalUser;

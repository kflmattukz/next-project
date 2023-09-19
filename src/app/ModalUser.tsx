import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Row, Col, Form, Input } from "antd";
import ModalForm from "@/components/ModalForm";
import type { ListUser } from "@/constant/interface";
import useAddUser from "@/hooks/useAddUser";
import useEditUser from "@/hooks/useEditUser";

export interface ModalUserProps {
  onModalOpen: (bool: boolean) => void;
}

interface Props {
  title: string;
  isEdit?: ListUser | undefined;
  addUserList: (data: ListUser) => void;
  updateUserList: (id: number, date: ListUser) => void;
  handleCancelEdit: () => void;
}

const { useForm } = Form;

const ModalUser = forwardRef<ModalUserProps, Props>(
  (
    {
      title,
      addUserList,
      isEdit = undefined,
      updateUserList,
      handleCancelEdit,
    },
    ref
  ) => {
    const [form] = useForm();
    const [isOpen, setOpen] = useState<boolean>(false);
    const { mutateAddUser, onSubmitAddUser } = useAddUser();
    const { mutateEditUser, onEditUser } = useEditUser();

    if (isEdit) {
      form.setFieldsValue(isEdit);
    }

    const {
      isLoading: isAddLoading,
      isSuccess: isAddSuccess,
      isError: isAddError,
      data: addUserData,
    } = mutateAddUser;

    const {
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      isError: isEditError,
      data: editUserData,
    } = mutateEditUser;

    function onModalOpen() {
      setOpen(true);
    }

    function handleFinish(data: ListUser) {
      if (isEdit) {
        onEditUser(isEdit.id, data);
      } else {
        onSubmitAddUser(data);
      }
    }

    useImperativeHandle(ref, () => ({
      onModalOpen,
    }));

    function handleCancel() {
      setOpen(false);
      if (isEdit) {
        isEdit = undefined;
        form.resetFields();
        handleCancelEdit();
      }
    }

    useEffect(() => {
      if (isAddSuccess) {
        addUserList(addUserData);
        form.resetFields();
        setOpen(false);
      }
    }, [isAddSuccess]);

    useEffect(() => {
      if (isAddError || isEditError) {
        form.resetFields();
      }
    }, [isAddError, isEditError]);

    useEffect(() => {
      if (isEditSuccess) {
        updateUserList(isEdit?.id as number, editUserData);
        form.resetFields();
        setOpen(false);
      }
    }, [isEditSuccess]);

    return (
      <ModalForm
        title={title}
        isOpen={isOpen}
        handleCancel={handleCancel}
        isSubmitLoasing={isAddLoading || isEditLoading}
        handleSubmit={() => form.submit()}
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
                <Input
                  type="text"
                  placeholder="put a color name or hex color"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalForm>
    );
  }
);

ModalUser.displayName = "ModalUser";
export default ModalUser;

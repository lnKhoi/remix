import React, {
  FC,
  memo,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Drawer,
  Form,
  Input,
  message,
  Select,
} from 'antd';
import {
  CreateUserPayload,
  createUserPermission,
} from '~/apis/permission';
import { getRoles } from '~/apis/role';
import { Role } from '~/models/role.model';

type ModalCreateUserProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (name:string) => void
};

const ModalCreateUser: FC<ModalCreateUserProps> = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false)
  const [roles, setRoles] = useState<Role[]>([])
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = (values: CreateUserPayload) => {
    setLoading(true);
  
    createUserPermission({...values})
      .then(() => {
        onSuccess(values.name)
        onClose()
      })
      .catch((err) => { messageApi.error(err.message);})
      .finally(() => {setLoading(false)});
  };
  
  const handleSubmit = () => {
    form.submit();
  };

  const handleGetRoles = () => {
    getRoles().then(res => setRoles(res.data.data))
  }

  useEffect(() => handleGetRoles(), [])

  return (
    <Drawer   open={open} onClose={onClose} title="Create User" width={650}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button loading={loading} type="primary" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={handleFinish}>

        {/* Full Name */}
        <Form.Item name="name" label="Full name" rules={[{ required: true, message: "Please enter full name" }]}>
          <Input placeholder="e.g. Emma Smith" />
        </Form.Item>

        {/* Email */}
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
          <Input placeholder="e.g. smith@website.com" />
        </Form.Item>

        {/* Role Selection */}
        <Form.Item name="roles" label="Role" rules={[{ required: true, message: "Please select a role" }]}>
          <Select maxTagCount={2} mode="multiple" placeholder="Select role">
            {roles.map((r) => (
              <Select.Option key={r.id} value={r.id}>
                {r.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default memo(ModalCreateUser)

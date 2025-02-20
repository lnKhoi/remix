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
  Upload,
} from 'antd';
import {
  CreateUserPayload,
  createUserPermission,
} from '~/apis/permission';
import { getRoles } from '~/apis/role';
import Avatar from '~/assets/upload-avatar.png';
import { Role } from '~/models/role.model';

import { UploadOutlined } from '@ant-design/icons';

type ModalCreateUserProps = {
  open: boolean;
  onClose: () => void;
};

const ModalCreateUser: FC<ModalCreateUserProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false)
  const [roles, setRoles] = useState<Role[]>([])
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = (values: CreateUserPayload) => {
    setLoading(true);
  
    createUserPermission(values)
      .then(() => {
        messageApi.success("Create user successfully!");
        onClose();
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
        {/* Picture Upload */}
        <p className="text-sm font-medium">Picture</p>
        <p className="text-xs text-gray-500 mt-[2px]">Format: JPG, GIF, PNG. Max: 1MB</p>
        <div className="flex gap-3 items-center my-5">
          <img className="w-[128px] h-[128px] object-cover rounded-[50%]" src={Avatar} alt="avatar" />
          <Upload showUploadList={false}>
            <Button className="bg-gray-100 border-none" icon={<UploadOutlined />}>
              Choose Picture
            </Button>
          </Upload>
        </div>

        {/* Full Name */}
        <Form.Item name="fullName" label="Full name" rules={[{ required: true, message: "Please enter full name" }]}>
          <Input placeholder="e.g. Emma Smith" />
        </Form.Item>

        {/* Email */}
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
          <Input placeholder="e.g. smith@website.com" />
        </Form.Item>

        {/* Role Selection */}
        <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select a role" }]}>
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

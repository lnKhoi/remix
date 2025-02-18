import React, {
  FC,
  memo,
} from 'react';

import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Upload,
} from 'antd';
import Avatar from '~/assets/upload-avatar.png';
import { ROLES } from '~/constants/roles.constant';

import { UploadOutlined } from '@ant-design/icons';

type ModalCreateUserProps = {
  open: boolean;
  onClose: () => void;
};

const ModalCreateUser: FC<ModalCreateUserProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form Values:", values);
    onClose(); 
  };

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <Drawer open={open} onClose={onClose} title="Create User" width={650}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      }
    >
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
          <Select mode="multiple" placeholder="Select role">
            {ROLES.map((r) => (
              <Select.Option key={r.value} value={r.value}>
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

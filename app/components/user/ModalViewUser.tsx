import React, {
  FC,
  memo,
  useState,
} from 'react';

import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Tabs,
} from 'antd';
import Avatar from '~/assets/upload-avatar.png';
import { UserTab } from '~/constants/permission.constant';
import { ROLES } from '~/constants/roles.constant';

import { PencilSquareIcon } from '@heroicons/react/24/outline';

type ModalViewUserProps = {
  open: boolean;
  onClose: () => void;
  id: string
};
const role = {
  "User": [
    "Remove user"
  ],
  "Role": [
    "Assign users to role"
  ],
  "Campaign": [
    "Approve influencer's gift request"
  ],
  "Influencer": [
    "Download CSV template",
    "Give star to influencer",
    "Import influencer (CSV)",
    "Invite imported influencers",
    "Review content deadline",
    "Suggest content deadline",
    "View applicants",
    "View imported influencer",
    "View influencer list/profile"
  ],
  "Content": [
    "Dispute content",
    "Download content",
    "Post content on behalf",
    "Review content",
    "View content"
  ],
  "Campaign Report": [
    "View report"
  ],
  "Finance": [
    "Download invoice",
    "View finance overview",
    "View influencer payment"
  ],
  "Product": [
    "Enter manufacturing cost/shipping fee",
    "View customer orders",
    "View influencer orders",
    "View Shopify products"
  ],
  "Payment": [
    "Buy tokens",
    "Link payment method",
    "Subscribe plan",
    "View payment/token history",
    "View wallet",
    "Withdraw tokens"
  ],
  "System management": [
    "Account management (change password)",
    "Connect Shopify",
    "Setting timezone"
  ],
  "Profile": [
    "Create profile",
    "Edit profile",
    "View profile"
  ],
  "Inbox": [
    "Chat with influencer"
  ]
}

const ModalViewUser: FC<ModalViewUserProps> = ({ open, onClose, id }) => {
  const [form] = Form.useForm();
  const [tab, setTab] = useState<'profile' | 'role'>('profile')
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleFinish = (values: any) => {
    console.log("Form Values:", values);
    onClose();
  };

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <Drawer open={open} onClose={onClose} title="View User" width={700}
      footer={
        tab == 'profile' ? <div className={`flex justify-end gap-2`}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>
            Save Change
          </Button>
        </div> : null
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {/* Picture Upload */}
        <div className="flex gap-5 items-center ">
          <img className="w-[120px] h-[120px] object-cover rounded-[50%]" src={Avatar} alt="avatar" />
          <div className='flex flex-col'>
            <h2 className='font-semibold text-2xl text-gray-800'>Emma Smith</h2>
            <p className='font-normal text-sm text-gray-800 mt-[2px]'>khoilam.dev@gmail.com</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs className='mt-5' defaultActiveKey="profile" items={UserTab} onChange={(e) => setTab(e as 'role' | 'profile')} />
        {/* Profile */}
        {tab == 'profile' && (
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-blue-600'>Public Profile</p>
            <Button
              onClick={() => setIsEdit(!isEdit)}
              className='text-blue-600 font-medium'
              type='text'
              icon={<PencilSquareIcon className='w-5 text-blue-600 h-5' />} >
              Edit
            </Button>
          </div>
        )}

        {tab == 'profile' && (
          <div className='mt-4 w-full'>
            {isEdit
              ? <div className='flex flex-col gap-4'>
                <div className='flex items-center'>
                  <p className='w-[400px] font-medium text-sm text-gray-500'>Full name:</p>
                  <p className='w-full font-medium text-sm text-gray-800'>khoi lam</p>
                </div>
                <div className='flex items-center'>
                  <p className='w-[400px] font-medium text-sm text-gray-500'>Email:</p>
                  <p className='w-full font-medium text-sm text-gray-800'>khoilam.dev@gmail.com</p>
                </div>
                <div className='flex items-center'>
                  <p className='w-[400px] font-medium text-sm text-gray-500'>Role:</p>
                  <p className='w-full font-medium text-sm text-gray-800'>Manager</p>
                </div>
              </div>
              : <>
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
              </>}

          </div>
        )}

        {/* Role */}
        {tab == 'role' && (
          <div className='flex w-full items-center gap-3'>
            <p className='text-sm font-medium text-gray-800'>Role name:</p>
            <Select className='w-[150px]' placeholder="Select role">
              {ROLES.map((r) => (
                <Select.Option key={r.value} value={r.value}>
                  {r.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        )}
        {tab == 'role' && (
          <div className='mt-4'>
            {Object?.entries(role)?.map(([k, v]) => (
              <div key={k}>
                <div className="bg-gray-100 p-[10px] capitalize text-sm font-medium text-gray-800 w-full">
                  {k}
                </div>
                <div className="grid grid-cols-2 ">
                  {Array.isArray(v) ? v?.map((per, index) => {
                    const isLastRow = index >= v.length - (v.length % 2 === 0 ? 2 : 1);
                    return (
                      <div
                        key={per}
                        className={`text-sm font-medium border-l-0 cursor-pointer hover:bg-gray-50 transition-all text-gray-800 capitalize px-[10px] h-[40px] flex items-center border-gray-200 ${!isLastRow ? 'border-b' : ''}  `}>
                        {per}
                      </div>
                    );
                  }) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </Form>

    </Drawer>
  );
};

export default memo(ModalViewUser)

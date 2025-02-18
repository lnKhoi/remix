import React, { useState } from 'react';

import {
  Avatar,
  Button,
  Checkbox,
  Collapse,
  Drawer,
  Form,
  Input,
  message,
  Select,
} from 'antd';

import {
  DownOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

interface ModalCreateRoleProps {
    open: boolean;
    onClose: () => void;
}

const ModalCreateRole: React.FC<ModalCreateRoleProps> = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [checkedPermissions, setCheckedPermissions] = useState<Record<string, boolean>>({});
    const [allSelected, setAllSelected] = useState(false);
    const [categorySelected, setCategorySelected] = useState<Record<string, boolean>>({});

    const [messageApi, contextHolder] = message.useMessage();
    const users = ["John Doe", "Jane Smith", "Alex Johnson"];

    const handleUserChange = (value: string[]) => setSelectedUsers(value);

    const handleSelectAll = (checked: boolean) => {
        setAllSelected(checked);
        setCategorySelected(Object.keys(permissions).reduce((acc, key) => ({ ...acc, [key]: checked }), {}));
        setCheckedPermissions(Object.values(permissions).flat().reduce((acc, perm) => ({ ...acc, [perm]: checked }), {}));
    };

    const permissions = {
        campaign: ["Create campaign", "Edit campaign", "View campaign", "Approve influencer’s gift request"],
        influencerInvitation: ["Invite influencer", "Revoke invitation", "View invitation", "Manage responses"],
        influencerManagement: ["Approve influencer", "Suspend influencer", "Assign influencer", "Remove influencer"],
        contentManagement: ["Upload content", "Edit content", "Delete content", "Review content"],
    };

    type PermissionCategories = keyof typeof permissions;  // 'campaign' | 'influencerInvitation' | 'influencerManagement' | 'contentManagement'
    const isPermissionSelected = (): boolean => Object.values(checkedPermissions).some(Boolean);


    const handleCategoryChange = (category: PermissionCategories, checked: boolean) => {
        setCategorySelected((prev) => ({ ...prev, [category]: checked }));

        const updatedPermissions = { ...checkedPermissions };
        permissions[category].forEach((perm) => {
            updatedPermissions[perm] = checked;
        });

        setCheckedPermissions(updatedPermissions);

        const allChecked = Object.keys(permissions).every((cat) => {
            const category = cat as keyof typeof permissions;  // Type assertion
            return permissions[category].every((p) => updatedPermissions[p]);
        });

        setAllSelected(allChecked);
    };


    const handlePermissionChange = (category: keyof typeof permissions, perm: string, checked: boolean) => {
        setCheckedPermissions((prev) => {
            const updatedPermissions = { ...prev, [perm]: checked };

            const selectedCount = permissions[category].filter((p) => updatedPermissions[p]).length;
            setCategorySelected((prevSelected) => {
                const updatedCategorySelected = { ...prevSelected };
                updatedCategorySelected[category] = selectedCount === permissions[category].length;
                return updatedCategorySelected;
            });

            const allChecked = Object.keys(permissions).every((cat) => {
                // Assert that `cat` is one of the keys of `permissions`
                const category = cat as keyof typeof permissions;  // Type assertion
                return permissions[category].every((p) => updatedPermissions[p]);
            });
            setAllSelected(allChecked);

            return updatedPermissions;
        });
    };

    const handleSubmit = async () => {
        form.validateFields()
        if (!isPermissionSelected()) {
            message.warning('Please select at least 1 permission')
        }
    };

    const handleReset = () => {
        onClose()
        form.resetFields()
        setCategorySelected({})
        setAllSelected(false)
        setCheckedPermissions({})
    }


    return (
        <Drawer
            title="Create new Role"
            width={650}
            onClose={handleReset}
            className='custom-collab'
            open={open}
            closable={true}
            footer={
                <div className="flex justify-end space-x-2 mt-4">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={handleSubmit}>Create</Button>
                </div>
            }
        >
            {contextHolder}
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Role name"
                    name="roleName"
                    rules={[{ required: true, message: "Role name is required" }]}
                >
                    <Input placeholder="Enter a role name" maxLength={50} showCount className='bg-gray-100 border-gray-100' />
                </Form.Item>

                <Form.Item label="Role description" className='h-[130px]' name="roleDescription">
                    <TextArea
                        maxLength={255}
                        style={{
                            height: 100, display: 'flex',
                            alignItems: 'start',
                        }}
                        draggable={false}
                        showCount
                        className="bg-gray-100 border-gray-100 h-full textarea-custom"
                    />
                </Form.Item>

                <Form.Item
                    label="Add user"
                    name="users"
                >
                    <Select
                        mode="multiple"
                        placeholder="Select users"
                        value={selectedUsers}
                        onChange={handleUserChange}
                    >
                        {users.map((user) => (
                            <Option key={user} value={user}>
                                <Avatar size="small" icon={<UserOutlined />} className="mr-2 w-5 h-5 object-cover " />
                                {user}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Role Permissions"
                    name="permissions"
                    required
                    validateTrigger="onSubmit"
                >
                    <div className='bg-gray-100 rounded-xl border border-gray-200'>
                        <Collapse bordered={false} >
                            <Checkbox className='text-gray-800 pl-[15px] pt-[10px]' checked={allSelected} onChange={(e) => handleSelectAll(e.target.checked)}>
                                Select all Permissions
                            </Checkbox>
                        </Collapse>
                        <div className='w-full border-t border-t-gray-300 mt-3'></div>

                        <Collapse
                            bordered={false}
                            expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                            expandIconPosition='right'
                        >
                            {Object.entries(permissions).map(([category, perms]) => {
                                const selectedCount = perms.filter((perm) => checkedPermissions[perm]).length;
                                return (
                                    <Panel
                                        key={category}
                                        header={
                                            <div className="flex justify-between w-full">
                                                <Checkbox
                                                    className='text-gray-800 capitalize'
                                                    checked={categorySelected[category] || false}
                                                    onChange={(e) => { handleCategoryChange(category as PermissionCategories, e.target.checked) }}
                                                >
                                                    {category.replace(/([A-Z])/g, " $1")}
                                                </Checkbox>
                                                <span>{selectedCount}/{perms.length}</span>
                                            </div>
                                        }
                                    >
                                        <div className="bg-white pl-4 gap-3 w-full grid grid-cols-2 p-[10px]">
                                            {perms.map((perm) => (
                                                <Checkbox
                                                    key={perm}
                                                    checked={checkedPermissions[perm] || false}
                                                    onChange={(e) => handlePermissionChange(category as PermissionCategories, perm, e.target.checked)}
                                                >
                                                    {perm}
                                                </Checkbox>
                                            ))}
                                        </div>
                                    </Panel>
                                );
                            })}
                        </Collapse>
                    </div>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default ModalCreateRole;

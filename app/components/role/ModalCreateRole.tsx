import React, {
  FC,
  useEffect,
  useState,
} from 'react';

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
import { getPermissions } from '~/apis/permission';
import {
  createRole,
  getUsers,
} from '~/apis/role';
import DefaultImage from '~/assets/avatar.jpeg';
import { Role } from '~/models/role.model';
import { User } from '~/models/User.model';

import { DownOutlined } from '@ant-design/icons';

import Permission from '../custom/skeletons/Permission';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

interface ModalCreateRoleProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void
}

const ModalCreateRole: FC<ModalCreateRoleProps> = ({ open, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const [loadingType, setLoadingType] = useState<'permissions' | 'create-permission' | ''>('')
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [checkedPermissions, setCheckedPermissions] = useState<Record<string, boolean>>({});
    const [allSelected, setAllSelected] = useState(false);
    const [categorySelected, setCategorySelected] = useState<Record<string, boolean>>({});
    const [permissions, setPermissions] = useState<Record<string, string[]>>({});

    const roleName = Form.useWatch('name', form)
    const [messageApi, contextHolder] = message.useMessage();
    const [users, setUsers] = useState<User[]>([])
    
    const [activePanels, setActivePanels] = useState<string[]>([]);

    const handleToggleExpandAll = () => {
        if (activePanels.length === Object.keys(permissions).length) {
            setActivePanels([]); // Collapse all
        } else {
            setActivePanels(Object.keys(permissions)); // Expand all
        }
    };

    const handleUserChange = (value: string[]) => setSelectedUsers(value);

    const handleSelectAll = (checked: boolean) => {
        setAllSelected(checked);
        setCategorySelected(Object.keys(permissions).reduce((acc, key) => ({ ...acc, [key]: checked }), {}));
        setCheckedPermissions(Object.values(permissions).flat().reduce((acc, perm) => ({ ...acc, [perm]: checked }), {}));
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
            return
        }

        setLoadingType('create-permission')
        const values = await form.getFieldsValue();

        const permissionObject = Object.fromEntries(
            Object.values(permissions).flat().map((perm) => [perm, !!checkedPermissions[perm]])
        );

        // Extract only the permissions with `true` values
        const selectedPermissionsArray = Object.keys(permissionObject).filter((perm) => permissionObject[perm]);

        const payload = {
            name: values.name,
            description: values.description,
            users: selectedUsers,
            permissions: selectedPermissionsArray
        }

        await createRole(payload as Role)
            .then(res => {
                onSuccess()
                handleReset()
            })
            .catch((err) => messageApi.warning(err.message))
            .finally(() => setLoadingType(''))
    };

    const handleReset = () => {
        onClose()
        form.resetFields()
        setCategorySelected({})
        setAllSelected(false)
        setCheckedPermissions({})
    }

    const handleGetUser = async () => {
        setLoadingType('permissions')
        const [permissionsRes, usersRes] = await Promise.all([
            getPermissions(),
            getUsers(),
        ]).finally(() => setLoadingType(''))
        setPermissions(permissionsRes?.data);
        setUsers(usersRes?.data?.data);
        setActivePanels(Object.keys(permissionsRes?.data || {}))
    }

    useEffect(() => { handleGetUser() }, [])

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
                    <Button
                        disabled={roleName?.trim() == '' || !roleName}
                        loading={loadingType == 'create-permission'}
                        type="primary"
                        onClick={handleSubmit}>Create
                    </Button>
                </div>
            }
        >
            {contextHolder}
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Role name"
                    name="name"
                    rules={[{ required: true, message: "Role name is required" }]}
                >
                    <Input placeholder="Enter a role name" maxLength={50} showCount className='bg-gray-100 border-gray-100' />
                </Form.Item>

                <Form.Item label="Role description" className='h-[130px]' name="description">
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
                        maxTagCount={2}
                        value={selectedUsers}
                        onChange={handleUserChange}
                        style={{ width: "100%" }}
                    >
                        {users.map((user) => (
                            <Option key={user.id} value={user.id}>
                                <div className="flex items-center">
                                    <Avatar size="small" src={user.picture || DefaultImage} className="mr-2 w-5 h-5 object-cover" />
                                    <span className="max-w-[150px] block">{user.name}</span>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Role Permissions" name="permissions" required>
                    <div className="bg-gray-100 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between p-3 pl-4">
                            <Checkbox
                                className="text-gray-800"
                                checked={allSelected}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                            >
                                Select all Permissions
                            </Checkbox>
                            <span
                                className="text-sm text-blue-500 font-medium cursor-pointer"
                                onClick={handleToggleExpandAll}
                            >
                                {activePanels.length === Object.keys(permissions).length ? 'Collapse All' : 'Expand All'}
                            </span>
                        </div>

                        <div className="w-full border-t border-t-gray-300"></div>

                        {loadingType === 'permissions' ? (
                            <Permission />
                        ) : (
                            <Collapse
                                activeKey={activePanels}
                                onChange={(keys) => setActivePanels(keys as string[])}
                                bordered={false}
                                expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                                expandIconPosition="right"
                            >
                                {Object.entries(permissions).map(([category, perms]) => {
                                    const selectedCount = perms?.filter((perm) => checkedPermissions[perm]).length;
                                    return (
                                        <Panel
                                            key={category}
                                            header={
                                                <div  className="flex justify-between w-full">
                                                    <Checkbox
                                                        onClick={(e) => e.stopPropagation()} 
                                                        className="text-gray-800 capitalize"
                                                        checked={categorySelected[category] || false}
                                                        onChange={(e) => handleCategoryChange(category as PermissionCategories, e.target.checked)}
                                                    >
                                                        <span onClick={(e) => e.stopPropagation()} >{category.replace(/([A-Z])/g, " $1")}</span>
                                                    </Checkbox>
                                                    <span>
                                                        {selectedCount}/{perms.length}
                                                    </span>
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
                                                        <span className="truncate max-w-[230px] block">{perm}</span>
                                                    </Checkbox>
                                                ))}
                                            </div>
                                        </Panel>
                                    );
                                })}
                            </Collapse>
                        )}
                    </div>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default ModalCreateRole;

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
  Skeleton,
} from 'antd';
import { getPermissions } from '~/apis/permission';
import {
  createRole,
  getRoleDetails,
  getUsers,
  updateRole,
} from '~/apis/role';
import DefaultImage from '~/assets/avatar.jpeg';
import { Role } from '~/models/role.model';
import { UserPermission } from '~/models/User.model';

import { DownOutlined } from '@ant-design/icons';

import Permission from '../custom/skeletons/Permission';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

interface ModalCreateRoleProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    type: 'create' | 'edit';
    initial?: Role;
}

type LoadingType = 'permissions' | 'create-permission' | '';
type PermissionsMap = Record<string, string[]>;
type CheckedState = Record<string, boolean>;

const ModalCreateRole: FC<ModalCreateRoleProps> = ({ open, onClose, onSuccess, type, initial }) => {
    const [form] = Form.useForm();
    const [loadingType, setLoadingType] = useState<LoadingType>('');
    const [selectedUsers, setSelectedUsers] = useState<string[] | UserPermission[]>([]);
    const [checkedPermissions, setCheckedPermissions] = useState<any>({});
    const [allSelected, setAllSelected] = useState(false);
    const [categorySelected, setCategorySelected] = useState<CheckedState>({});
    const [permissions, setPermissions] = useState<PermissionsMap>({});
    const [users, setUsers] = useState<UserPermission[] | string[]>(initial?.users as UserPermission[] || []);
    const [activePanels, setActivePanels] = useState<string[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [totalPermissions, setTotalPermissions] = useState<number>(0)

    const roleName = Form.useWatch('name', form);

    // Utility Functions
    const fetchInitialData = async () => {
        setLoadingType('permissions');
        try {
            const [permissionsRes, usersRes] = await Promise.all([getPermissions(), getUsers(1, 500, '')]);
            setPermissions(permissionsRes?.data || {});
            setUsers(usersRes?.data?.data || initial?.users || []);
            setActivePanels(Object.keys(permissionsRes?.data || {}));
        } catch (error) {
            console.error('Error fetching initial data:', error);
        } finally {
            setLoadingType('');
        }
    };

    //   Initial Role
    const initializeRole = async () => {

        if (!initial?.id) return;

        // @ts-ignore
        const userIds = initial?.users?.map((user) => user?.id);
        setSelectedUsers(userIds as any);
        form.setFieldsValue({ users: userIds });

        try {
            const { data } = await getRoleDetails(initial.id);
            form.setFieldsValue({ name: data.name, description: data.description });

            const permsData = data.permissions || {};
            const newCheckedPerms = Object.values(permsData)
                .flat()
                // @ts-ignore
                .reduce((acc, perm) => ({ ...acc, [perm]: true }), {});
            setCheckedPermissions(newCheckedPerms);

            const newCategorySelected = Object.fromEntries(
                // @ts-ignore
                Object.entries(permsData).map(([cat, perms]) => [cat, perms.length > 0])
            );

            setCategorySelected(newCategorySelected);
            setPermissions((prev) => ({ ...prev, ...permsData }));

            setTotalPermissions(Object.values(data?.permissions).flat().length)

        } catch (error) {
            console.error('Error fetching role details:', error);
            messageApi.error('Failed to load role details');
        }
    };

    // Clean form fields
    const resetForm = () => {
        onClose();
        form.resetFields();
        setCategorySelected({});
        setAllSelected(false);
        setCheckedPermissions({});
        setSelectedUsers([]);
    };

    // Event Handlers
    const handleTogglePanels = () =>
        setActivePanels(activePanels.length === Object.keys(permissions).length ? [] : Object.keys(permissions));

    //   Change Users
    const handleUserChange = (value: string[]) => {
        setSelectedUsers(value);
        form.setFieldsValue({ users: value });
    };

    // Toggle Select all categories
    const handleSelectAll = (checked: boolean) => {
        setAllSelected(checked);
        setCategorySelected(Object.fromEntries(Object.keys(permissions).map((key) => [key, checked])));
        setCheckedPermissions(
            Object.values(permissions)
                .flat()
                .reduce((acc, perm) => ({ ...acc, [perm]: checked }), {})
        );
    };

    // Change Categories
    const handleCategoryChange = (category: string, checked: boolean) => {
        setCategorySelected((prev) => ({ ...prev, [category]: checked }));
        const updatedPermissions = { ...checkedPermissions };
        permissions[category].forEach((perm) => (updatedPermissions[perm] = checked));
        setCheckedPermissions(updatedPermissions);
        setAllSelected(Object.keys(permissions).every((cat) => permissions[cat].every((p) => updatedPermissions[p])));
    };

    // Utility function to determine related permissions
    const getRelatedPermissions = (perm: string, allPerms: string[], isChecking: boolean): string[] => {
        const related: string[] = [];
        const permLower = perm.toLowerCase();

        // Helper to check if a permission exists in the category
        const exists = (action: string) => {
            const target = allPerms.find(p => p.toLowerCase().includes(action.toLowerCase()));
            return target && !related.includes(target) ? target : null;
        };

        // Create + View pair
        if (permLower.includes('create') && isChecking) {
            const viewPerm = exists('view');
            if (viewPerm) related.push(viewPerm);
        }

        // Edit + View pair
        if (permLower.includes('edit') && isChecking) {
            const viewPerm = exists('view');
            if (viewPerm) related.push(viewPerm);
        }

        // Delete + View pair
        if ((permLower.includes('delete') || permLower.includes('remove')) && isChecking) {
            const viewPerm = exists('view');
            if (viewPerm) related.push(viewPerm);
        }

        // Export + View pair
        if ((permLower.includes('export') || permLower.includes('download')) && isChecking) {
            const viewPerm = exists('view');
            if (viewPerm) related.push(viewPerm);
        }

        // Approve/Reject + View pair
        if ((permLower.includes('approve') || permLower.includes('reject')) && isChecking) {
            const viewPerm = exists('view');
            if (viewPerm) related.push(viewPerm);
        }

        // For unchecking, return related View permission
        if (!isChecking) {
            if (permLower.includes('create') || permLower.includes('edit') ||
                permLower.includes('delete') || permLower.includes('remove') ||
                permLower.includes('export') || permLower.includes('download') ||
                permLower.includes('approve') || permLower.includes('reject')) {
                const viewPerm = exists('view');
                if (viewPerm) related.push(viewPerm);
            }
        }

        return related;
    };

    // Helper function to check if any primary action is active
    const hasPrimaryActionChecked = (categoryPerms: string[], checkedPerms: any): boolean => {
        return categoryPerms.some(p => {
            const pLower = p.toLowerCase();
            return (pLower.includes('create') || pLower.includes('edit') ||
                pLower.includes('delete') || pLower.includes('remove') ||
                pLower.includes('export') || pLower.includes('download') ||
                pLower.includes('approve') || pLower.includes('reject')) && checkedPerms[p];
        });
    };

    // Updated handlePermissionChange function
    const handlePermissionChange = (category: string, perm: string, checked: boolean) => {
        setCheckedPermissions((prev: any) => {
            const updated = { ...prev, [perm]: checked };

            // Get all permissions in the current category
            const categoryPerms = permissions[category];

            // Find related permissions based on whether we're checking or unchecking
            const relatedPerms = getRelatedPermissions(perm, categoryPerms, checked);

            // If checking a permission, auto-check related permissions
            if (checked) {
                relatedPerms.forEach(related => {
                    updated[related] = true;
                });
            }
            // If unchecking a permission, handle logic
            else {
                const permLower = perm.toLowerCase();
                if (permLower.includes('create') || permLower.includes('edit') ||
                    permLower.includes('delete') || permLower.includes('remove') ||
                    permLower.includes('export') || permLower.includes('download') ||
                    permLower.includes('approve') || permLower.includes('reject')) {
                    relatedPerms.forEach(related => {
                        // Only uncheck View if no primary actions remain checked
                        if (!hasPrimaryActionChecked(categoryPerms, { ...updated, [perm]: false })) {
                            updated[related] = false;
                        }
                    });
                }
                // If unchecking View, force it back to true if any primary action is checked
                else if (permLower.includes('view') && hasPrimaryActionChecked(categoryPerms, updated)) {
                    updated[perm] = true; // Force View back to true
                }
            }

            // Ensure View is true if any primary action is checked
            const viewPerm = categoryPerms.find(p => p.toLowerCase().includes('view'));
            if (viewPerm && hasPrimaryActionChecked(categoryPerms, updated)) {
                updated[viewPerm] = true;
            }

            const selectedCount = categoryPerms.filter((p) => updated[p]).length;
            setCategorySelected((prev) => ({
                ...prev,
                [category]: selectedCount === categoryPerms.length
            }));
            setAllSelected(Object.keys(permissions).every((cat) =>
                permissions[cat].every((p) => updated[p])
            ));

            return updated;
        });
    };
    // Submit => Create , Edit Role
    const handleSubmit = async () => {
        try {
            await form.validateFields();
            if (!Object.values(checkedPermissions).some(Boolean)) {
                message.warning('Please select at least 1 permission');
                return;
            }

            setLoadingType('create-permission');
            const values = form.getFieldsValue();
            const selectedPermissions = Object.entries(checkedPermissions)
                .filter(([, value]) => value)
                .map(([perm]) => perm);

            const payload = {
                name: values.name,
                description: values.description || '',
                users: selectedUsers,
                permissions: selectedPermissions,
                type: type // 'create' or 'edit'
            };

            const API = type == 'create'
                ? createRole(payload as any)
                : updateRole(initial?.id as string, payload as any)

            await API.then(() => {
                onSuccess();
                resetForm();
            })
        } catch (error) {
            messageApi.error((error as Error).message || 'Failed to save role'); // Error handling
        } finally {
            setLoadingType(''); // Clears loading state
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    // Initial value only edit role
    useEffect(() => {
        if (initial && type === 'edit') initializeRole();
    }, [initial]);

    // Compare checked permissions is full or not
    useEffect(() => {
        if (initial && type === 'edit' && totalPermissions > 0) {
            const checkedAllPermissions = totalPermissions === Object.values(permissions).flat().length;
            setAllSelected(checkedAllPermissions)
        }
    }, [totalPermissions, initial, permissions]);

    // Render Helpers
    const renderUserOption = (user: UserPermission) => (
        <Option key={user.id} value={user.id}>
            <div className="flex items-center">
                <Avatar size="small" src={user.picture || DefaultImage} className="mr-2 w-5 h-5 object-cover" />
                <span className="max-w-[150px] block">{user.email}</span>
            </div>
        </Option>
    );

    const renderPermissionPanel = ([category, perms]: [string, string[]]) => {
        const selectedCount = perms.filter((perm) => checkedPermissions[perm]).length;
        return (
            <Panel
                key={category}
                header={
                    <div className="flex justify-between w-full">
                        <Checkbox
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-800 capitalize"
                            checked={categorySelected[category] || false}
                            onChange={(e) => handleCategoryChange(category, e.target.checked)}
                        >
                            <span onClick={(e) => e.stopPropagation()}>{category.replace(/([A-Z])/g, ' $1')}</span>
                        </Checkbox>
                        <span>{`${selectedCount}/${perms.length}`}</span>
                    </div>
                }
            >
                <div className="bg-white pl-4 gap-3 w-full grid grid-cols-2 p-[10px]">
                    {perms.map((perm) => (
                        <Checkbox
                            key={perm}
                            checked={checkedPermissions[perm] || false}
                            onChange={(e) => handlePermissionChange(category, perm, e.target.checked)}
                        >
                            <span className="truncate max-w-[230px] block">{perm}</span>
                        </Checkbox>
                    ))}
                </div>
            </Panel>
        );
    };

    return (
        <Drawer
            title={type === 'edit' ? 'Edit Role' : 'Create new Role'}
            width={650}
            onClose={resetForm}
            className="custom-collab"
            open={open}
            closable
            footer={
                <div className="flex justify-end space-x-2 mt-4">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        disabled={!roleName?.trim()}
                        loading={loadingType === 'create-permission'}
                        type="primary"
                        onClick={handleSubmit}
                    >
                        {type === 'edit' ? 'Save Changes' : 'Create'}
                    </Button>
                </div>
            }
        >
            {contextHolder}
            <Form form={form} layout="vertical" initialValues={initial}>
                <Form.Item label="Role name" name="name" rules={[{ required: true, message: 'Role name is required' }]}>
                    <Input placeholder="Enter a role name" maxLength={50} showCount className="bg-gray-100 border-gray-100" />
                </Form.Item>

                <Form.Item label="Role description" name="description" className="h-[130px]">
                    <TextArea
                        maxLength={255}
                        style={{ minHeight: 100, display: 'flex', alignItems: 'start' }}
                        draggable={false}
                        showCount
                        className="bg-gray-100 border-gray-100 textarea-custom"
                    />
                </Form.Item>

                <Form.Item label="Add user" name="users">
                    <div className='flex items-center'>
                        {loadingType == 'permissions'
                            ? <Skeleton.Node active style={{ height: 35, width: 586 }} />
                            : <Select
                                mode="multiple"
                                placeholder="Select users"
                                maxTagCount={1}
                                value={selectedUsers as string[]}
                                onChange={handleUserChange}
                                style={{ width: '100%' }}
                            >
                                {(users as UserPermission[])?.filter(
                                    (u) => u?.archive === "unarchive"
                                )?.map(renderUserOption)}
                            </Select>}
                    </div>
                </Form.Item>

                <Form.Item label="Role Permissions" name="permissions" required>
                    <div className="bg-gray-100 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between p-3 pl-4">
                            <Checkbox
                                className="text-gray-800"
                                checked={loadingType == 'permissions' ? false : allSelected}
                                onChange={(e) => handleSelectAll(e.target.checked)}>
                                Select all Permissions
                            </Checkbox>
                            <span className="text-sm text-blue-500 font-medium cursor-pointer" onClick={handleTogglePanels}>
                                {activePanels.length === Object.keys(permissions).length ? 'Collapse All' : 'Expand All'}
                            </span>
                        </div>
                        <div className="w-full border-t border-t-gray-300" />
                        {Object.keys(permissions).length == 0 ? (
                            <Permission />
                        ) : (
                            <Collapse
                                activeKey={activePanels}
                                onChange={(keys) => setActivePanels(keys as string[])}
                                bordered={false}
                                expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                                expandIconPosition="right"
                            >
                                {Object.entries(permissions).map(renderPermissionPanel)}
                            </Collapse>
                        )}
                    </div>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default ModalCreateRole;
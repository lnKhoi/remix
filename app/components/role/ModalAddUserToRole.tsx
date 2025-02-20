import React, {
  Key,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Drawer,
  message,
  Table,
} from 'antd';
import { TableProps } from 'antd/lib';
import {
  addUsersToRole,
  getUsers,
} from '~/apis/role';
import { UserColumns } from '~/constants/roles.constant';
import { Role } from '~/models/role.model';
import {
  User,
  UserPermission,
} from '~/models/User.model';

import { InputSearch } from '../ui/input-search';

type ModalAddUserToRoleProps = {
    open: boolean;
    onclose: () => void;
    role: Role
    onSuccess: () => void

};

function ModalAddUserToRole({ onclose, open, role, onSuccess }: ModalAddUserToRoleProps) {
    const [search, setSearch] = useState<string>('');
    const [users, setUsers] = useState<UserPermission[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingInvite, setLoadingInvite] = useState<boolean>(false)

    const [messageApi, contextHolder] = message.useMessage();

    const [selectedUser, setSelectedUser] = useState<string[]>(
        role?.users?.map((user) => (user as User)?.id) || []
    );

    const rowSelection: TableProps<UserPermission>['rowSelection'] = {
        selectedRowKeys: selectedUser,
        onChange: (selectedRowKeys: Key[], selectedRows: UserPermission[]) => {
            setSelectedUser(selectedRowKeys as string[]);
        },
    };

    const getAllUsers = () => {
        setLoading(true)
        getUsers().then(res => setUsers(res?.data?.data))
            .finally(() => setLoading(false))
    }

    useEffect(() => { getAllUsers() }, [])

    const handleAddUsersToRole = () => {
        setLoadingInvite(true)
        addUsersToRole(role.id, selectedUser).then(res => {
            messageApi.success(`Add users to ${role.name} successfully!`)
            onSuccess()
        })
            .finally(() => setLoadingInvite(false))
            .catch(err => messageApi.error(err?.message))
    }

    return (
        <Drawer
            width={650}
            open={open}
            onClose={onclose} title={`Add user to ${role.name}`}
            footer={<div className='flex items-center gap-3 justify-end'>
                <Button onClick={onSuccess} >Success</Button>
                <Button>Cancel</Button>
                <Button
                    onClick={handleAddUsersToRole}
                    loading={loadingInvite}
                    disabled={selectedUser.length == 0}
                    type='primary'>Add</Button>
            </div>}
        >
            {contextHolder}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-gray-800">User Unassigned</p>
                    <span className="text-sm font-normal text-gray-500">Selected ({selectedUser.length})</span>
                </div>
                <InputSearch onChange={(e) => setSearch(e.target.value)} placeholder="Search name" />
            </div>

            {/* Users */}
            <div className="mt-5">
                <Table
                    rowKey={'id'}
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    dataSource={loading ? [1, 2, 3, 4] as any : users}
                    columns={UserColumns(loading)} />
            </div>
        </Drawer>
    );
}

export default ModalAddUserToRole;

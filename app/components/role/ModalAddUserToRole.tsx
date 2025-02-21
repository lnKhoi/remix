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
    const [users, setUsers] = useState<{ total: number, data: UserPermission[] }>({ total: 0, data: [] })
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingInvite, setLoadingInvite] = useState<boolean>(false)
    const [params, setParams] = useState<{ page: number, pageSize: number }>({ page: 1, pageSize: 10 })

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
        getUsers(params.page, params.pageSize).then(res => setUsers({ data: res?.data?.data, total: res?.data?.total }))
            .finally(() => setLoading(false))
    }

    useEffect(() => { getAllUsers() }, [params.page,params.pageSize])

    const handleAddUsersToRole = () => {
        setLoadingInvite(true)
        addUsersToRole(role.id, selectedUser).then(res => {
            onSuccess()
            onclose()
            
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
                    pagination={{
                        pageSize: params.pageSize,
                        current: params.page,
                        total: users.total,
                        onChange: (page, pageSize) => {
                            setParams({ page: page, pageSize: pageSize })
                        },
                    }}
                    rowKey={'id'}
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    dataSource={loading ? [1, 2, 3, 4] as any : users.data}
                    columns={UserColumns(loading)} />
            </div>
        </Drawer>
    );
}

export default ModalAddUserToRole;

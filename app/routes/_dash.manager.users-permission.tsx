import React, { Key } from 'react';

import {
  Button,
  Table,
  TableProps,
} from 'antd';
import { RolesColumns } from '~/constants/roles.constant';
import { UserPermission } from '~/models/User.model';

import { PlusIcon } from '@heroicons/react/24/outline';
import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [{ title: 'Users Permission' }];
};

const rowSelection: TableProps<UserPermission>['rowSelection'] = {
    onChange: (selectedRowKeys: Key[], selectedRows: UserPermission[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

function UsersPermission() {
    // Handle actions with user ID
    const handleViewUser = (id: string) => {
        console.log(`Viewing user with ID: ${id}`);
    };

    const handleEditUser = (id: string) => {
        console.log(`Editing user with ID: ${id}`);
    };

    const handleDeleteUser = (id: string) => {
        console.log(`Deleting user with ID: ${id}`);
    };

    return (
        <div>
            <div className='flex items-center justify-between w-full'>
                <div>
                    <h2 className='text-2xl font-medium text-gray-800'>Users Permission</h2>
                    <p className='text-sm font-normal text-gray-800'>Manage who has access in your system</p>
                </div>
                <Button type='primary'>
                    <PlusIcon className='w-5 h-5 text-white' /> Add User
                </Button>
            </div>
            <div className='mt-5'>
                <Table<UserPermission>
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    columns={RolesColumns({
                        onViewUser: handleViewUser,
                        onEditUser: handleEditUser,
                        onDeleteUser: handleDeleteUser,
                    })}
                    dataSource={[
                        { id: '1', name: 'Khoi Lam', email: 'khoilam.dev@gmail.com' },
                        { id: '2', name: 'John Doe', email: 'johndoe@example.com' },
                        { id: '3', name: 'Jane Smith', email: 'janesmith@example.com' },
                    ]}
                />
            </div>
        </div>
    );
}

export default UsersPermission;

import React, {
  Key,
  useState,
} from 'react';

import {
  Button,
  Table,
  TableProps,
} from 'antd';
import ModalCreateUser from '~/components/user/ModalCreateUser';
import ModalViewUser from '~/components/user/ModalViewUser';
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
    const [selectedId, setSelectedId] = useState<string>('')
    const [modalType, setModalType] = useState<'view-user' | 'edit-user' | 'create-user' | ''>('')


    const handleViewUser = (id: string) => {
        setModalType('view-user')
        setSelectedId(id)
    }

    const handleEditUser = (id: string) => {
        setSelectedId(id)
        // setModalType('edit-user')
    }

    const handleDeleteUser = (id: string) => {
        setSelectedId(id)
    };

    return (
        <div>
            <div className='flex items-center justify-between w-full'>
                <div>
                    <h2 className='text-2xl font-medium text-gray-800'>Users Permission</h2>
                    <p className='text-sm font-normal text-gray-800'>Manage who has access in your system</p>
                </div>
                <Button onClick={() => setModalType('create-user')} type='primary'>
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

            {/* Create User */}
            {modalType == 'create-user' && (
                <ModalCreateUser
                    onClose={() => setModalType('')}
                    open={modalType == 'create-user'}
                />
            )}

            {/* View User */}
            {modalType == 'view-user' && (
                <ModalViewUser
                    id={selectedId}
                    onClose={() => setModalType('')}
                    open={modalType == 'view-user'}
                />
            )}
        </div>
    );
}

export default UsersPermission;

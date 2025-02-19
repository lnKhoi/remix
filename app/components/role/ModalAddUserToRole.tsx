import React, {
  Key,
  useState,
} from 'react';

import {
  Button,
  Drawer,
  Table,
} from 'antd';
import { TableProps } from 'antd/lib';
import { UserColumns } from '~/constants/roles.constant';
import { UserPermission } from '~/models/User.model';

import { InputSearch } from '../ui/input-search';

type ModalAddUserToRoleProps = {
    open: boolean;
    onclose: () => void;
};

const dataSource: UserPermission[] = [
    {
        id: '1',
        name: 'Mike',
        email: 'abc@yopmail.com',
    },
    {
        id: '2',
        name: 'John',
        email: 'khoilam.dev@gmail.com',
    },
];

function ModalAddUserToRole({ onclose, open }: ModalAddUserToRoleProps) {
    const [search, setSearch] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<string[]>([])

    const rowSelection: TableProps<UserPermission>['rowSelection'] = {
        onChange: (_selectedRowKeys: Key[], selectedRows: UserPermission[]) => {
            setSelectedUser(selectedRows.map(u => u.id))
        },
    };

    return (
        <Drawer
            width={650}
            open={open}
            onClose={onclose} title="Add user to [Role]"
            footer={<div className='flex items-center gap-3 justify-end'>
                <Button>Cancel</Button>
                <Button disabled={selectedUser.length == 0} type='primary'>Invite</Button>
            </div>}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-gray-800">User Unassigned</p>
                    <span className="text-sm font-normal text-gray-500">Selected (6)</span>
                </div>
                <InputSearch onChange={(e) => setSearch(e.target.value)} placeholder="Search name" />
            </div>

            {/* Users */}
            <div className="mt-5">
                <Table
                    rowKey={'id'}
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    dataSource={dataSource}
                    columns={UserColumns} />
            </div>
        </Drawer>
    );
}

export default ModalAddUserToRole;

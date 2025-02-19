import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import {
  Breadcrumb,
  Button,
  Skeleton,
  Table,
} from 'antd';
import { getPermissions } from '~/apis/permission';
import Permission from '~/components/custom/skeletons/Permission';
import ModalAddUserToRole from '~/components/role/ModalAddUserToRole';
import { UserAssignedColumns } from '~/constants/roles.constant';

import { PlusOutlined } from '@ant-design/icons';
import { MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [{ title: 'Role Details' }]
}

const users = [
    { id: 1, name: "[username]", email: "candel1992@gmail.com" },
    { id: 2, name: "[username]", email: "Pulos1950@gmail.com" },
    { id: 3, name: "[username]", email: "5sor@gmail.com" },
    { id: 4, name: "[username]", email: "wiliam87@gmail.com" },
    { id: 5, name: "[username]", email: "grew-sra@gmail.com" },
    { id: 6, name: "[username]", email: "masst@gmail.com" },
];

const EmployeeRole: FC = () => {
    const [modalAddUser, setModalAddUser] = useState<boolean>(false)
    const [loadingType, setLoadingType] = useState<'' | 'permissions'>('')
    const [permissions, setPermissions] = useState<Record<string, string[]>>({});

    const handleGetPermissions = () => {
        setLoadingType('permissions')
        getPermissions().then(res => setPermissions(res.data))
            .finally(() => setLoadingType(''))
    }

    useEffect(() => { handleGetPermissions() }, [])

    return (
        <div >
            <Breadcrumb
                className='fixed h-[40px] w-full '
                items={[
                    { title: <Link to={'/manager/roles'}>Roles</Link>, },
                    { title: <p className='text-gray-800'>Role Details</p> },
                ]}
            />
            <h1 className="text-2xl font-medium mb-4 mt-10">Employee</h1>

            <div className="flex flex-col lg:flex-row gap-4 items-start">
                {/* Role Details */}
                <div className="bg-white py-4 border border-gray-200 rounded-xl hover:shadow-sm transition-all flex-1">
                    <div className="text-lg font-semibold px-4 pb-3 border-b border-b-gray-200">Role Details</div>
                    <div className='flex flex-col px-4'>
                        <p className="text-sm text-gray-600 font-normal  mt-4">
                            {loadingType == 'permissions' ? <Skeleton.Input active style={{ height: 17 }} /> : 'Role name'}
                        </p>
                        <span className="font-medium text-sm text-gray-800 mt-1">Employee</span>
                    </div>
                    <div className='flex flex-col border-b border-b-gray-200 pb-4 px-4 mt-4'>
                        <p className="text-sm font-normal text-gray-600">
                            Role description:
                        </p>
                        <span className='font-medium text-sm text-gray-800'>
                            {loadingType == 'permissions'
                                ? <Skeleton.Input active style={{ height: 17 }} />
                                : ' In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo'}
                        </span>
                    </div>

                    <div className="flex px-4 justify-between items-center mt-4">
                        <h3 className="font-medium">User Assigned ({users.length})</h3>
                        <Button onClick={() => setModalAddUser(true)} type="primary" icon={<PlusOutlined />}>
                            Add User
                        </Button>
                    </div>
                    <Table
                        dataSource={users}
                        columns={UserAssignedColumns(loadingType =='permissions')}
                        pagination={{ pageSize: 5 }}
                        rowKey="id"
                        className="mt-5 px-5"
                    />
                </div>

                {/* Role Permissions */}
                <div className="bg-white py-4 border border-gray-200 rounded-xl hover:shadow-sm transition-all flex-1">
                    <div className="text-lg font-semibold px-4 pb-3 border-b border-b-gray-200">Role Permissions</div>
                    <div className="flex flex-col m-4 border border-gray-200 rounded-xl">
                        {loadingType == 'permissions'
                            ? <Permission />
                            : Object.entries(permissions).map(([k, v]) => (
                                <div key={k}>
                                    <div className="bg-gray-100 p-[10px] capitalize text-sm font-medium text-gray-800 w-full">
                                        {k}
                                    </div>
                                    <div className="grid grid-cols-2 ">
                                        {v.map((per, index) => {
                                            const isLastRow = index >= v.length - (v.length % 2 === 0 ? 2 : 1);
                                            return (
                                                <div
                                                    key={per}
                                                    className={`text-sm font-medium border-l-0 cursor-pointer hover:bg-gray-50 transition-all text-gray-800 capitalize px-[10px] h-[40px] flex items-center border-gray-200 ${!isLastRow ? 'border-b' : ''}  `}>
                                                    {per}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Modal Add User To Role */}
            {modalAddUser && (
                <ModalAddUserToRole
                    open={modalAddUser}
                    onclose={() => setModalAddUser(false)}
                />
            )}
        </div>
    );
};

export default EmployeeRole;

import React, { useState } from 'react';

import { Button } from 'antd';
import ModalCreateRole from '~/components/role/ModalCreateRole';
import RoleCard from '~/components/role/RoleCard';

import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Role' }];
};

function Roles() {
  const [modalType, setModalType] = useState<'create-role' | ''>('')

  return (
    <div>
      <div className='flex items-center w-full justify-between'>
        <div>
          <h2 className='text-2xl font-medium text-gray-800'>Roles</h2>
          <p className='font-normal text-gray-500 text-sm'>View, Create and manage your roles with preferred configuration</p>
        </div>
        <Button onClick={() => setModalType('create-role')} type='primary'>Create Role</Button>
      </div>
      <div className='mt-5 grid w-full grid-cols-2 md:grid-cols-3  2xl:grid-cols-4 gap-4'>
        <RoleCard />
        <RoleCard />
        <RoleCard />
        <RoleCard />
      </div>

      {/* Create Role */}
      <ModalCreateRole
        onClose={() => setModalType('')}
        open={modalType == 'create-role'}
      />
    </div>
  )
}

export default Roles

import React from 'react';

import { Button } from 'antd';
import RoleCard from '~/components/role/RoleCard';

import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Role' }];
};

function Roles() {
  return (
    <div>
      <div className='flex items-center w-full justify-between'>
        <div>
          <h2 className='text-2xl font-medium text-gray-800'>Roles</h2>
          <p className='font-normal text-gray-500 text-sm'>View, Create and manage your roles with preferred configuration</p>
        </div>
        <Button type='primary'>Create Role</Button>
      </div>
      <div className='mt-5 grid w-full grid-cols-2 md:grid-cols-3  2xl:grid-cols-4 gap-4'>
        <RoleCard />
        <RoleCard />
        <RoleCard />
        <RoleCard />
      </div>
    </div>
  )
}

export default Roles

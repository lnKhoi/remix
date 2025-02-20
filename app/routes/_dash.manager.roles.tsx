import React, {
  useEffect,
  useState,
} from 'react';

import { Button } from 'antd';
import { getRoles } from '~/apis/role';
import RoleCardSkeleton from '~/components/custom/skeletons/RoleCardSkeleton';
import ModalCreateRole from '~/components/role/ModalCreateRole';
import RoleCard from '~/components/role/RoleCard';
import { Role } from '~/models/role.model';

import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Role' }];
};

function Roles() {
  const [modalType, setModalType] = useState<'create-role' | ''>('')
  const [roles, setRoles] = useState<Role[]>([])
  const [loadingType, setLoadingType] = useState<'get-roles' | 'create-role' | ''>('')

  const handleGetRoles = () => {
    setLoadingType('get-roles')
    getRoles().then(res => setRoles(res?.data?.data))
      .finally(() => setLoadingType(''))
  }

  const handleRefresh = () => {
    setLoadingType('create-role')
    getRoles().then(res => setRoles(res?.data?.data))
      .finally(() => setLoadingType(''))
  }

  useEffect(() => handleGetRoles(), [])

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
        {loadingType == 'create-role' && (
          <RoleCardSkeleton />
        )}
        {loadingType == 'get-roles'
          ? [1, 2, 3, 4, 5, 6, 7, 8].map(() => <RoleCardSkeleton />)
          : roles.map(role => (
            <RoleCard key={role.id} role={role} />
          ))}
      </div>
      {/* Create Role */}
      {modalType == 'create-role' && (
        <ModalCreateRole
          onSuccess={handleRefresh}
          onClose={() => setModalType('')}
          open={modalType == 'create-role'}
        />
      )}
    </div>
  )
}

export default Roles

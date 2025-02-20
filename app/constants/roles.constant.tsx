import {
  Button,
  Skeleton,
  TableColumnsType,
} from 'antd';
import Avatar from '~/assets/avatar.jpeg';
import { UserPermission } from '~/models/User.model';

import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export const RolesColumns = ({
  onViewUser,
  onEditUser,
  onDeleteUser,
}: {
  onViewUser: (id: string) => void;
  onEditUser: (id: string) => void;
  onDeleteUser: (id: string) => void;
}): TableColumnsType<UserPermission> => [
    {
      title: 'Name',
      render: (_, record) => (
        <div className='flex gap-3 items-start'>
          <img className='w-9 h-9 object-cover rounded-[50%]' src={Avatar} alt="avatar" />
          <div className="flex flex-col">
            <p className='text-sm font-medium text-gray-800'>{record.name}</p>
            <span className='text-sm text-gray-500 font-normal'>{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      render: () => <div>Administration</div>,
    },
    {
      title: 'Last Activity',
      render: () => <div>1 hour ago</div>,
    },
    {
      title: 'Joined Date',
      render: () => <div>12/01/2024</div>,
    },
    {
      align: 'justify',
      title: 'Action',
      render: (_, record) => {
        return (
          <div className="flex items-center gap-3">
            <EyeIcon onClick={() => onViewUser(record.id)} className='w-5 h-5 cursor-pointer  text-gray-800' />
            <PencilSquareIcon onClick={() => onEditUser(record.id)} className='w-5 h-5 cursor-pointer  text-gray-800' />
            <TrashIcon onClick={() => onDeleteUser(record.id)} className='w-5 h-5 cursor-pointer text-gray-800' />
          </div>
        );
      },
    },
  ];


export const ROLES = [
  { name: 'Administrator', value: 'administrator' },
  { name: 'Manager', value: 'manager' },
  { name: 'User', value: 'user' },
  { name: 'Employee', value: 'employee' }
]


export const UserColumns = (loading: boolean): TableColumnsType<UserPermission> => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => (
      <div className="flex items-start gap-3">
        {loading
          ? <Skeleton.Avatar active style={{ width: 36, height: 36 }} />
          : <img src={Avatar} alt="avatar" className="w-9 h-9 rounded-[50%] object-cover" />}
        <div>
          <p className="text-sm font-medium text-gray-800">
            {loading ? <Skeleton.Input active style={{ height: 18 }} /> : record.name}
          </p>
          <span className="text-sm font-normal text-gray-500">
            {loading ? <Skeleton.Input active style={{ height: 18 }} /> : record.email}
          </span>
        </div>
      </div>
    ),
  },
];

export const UserAssignedColumns = (loading: boolean, onDelete: (id: string) => void, deletingUserIds: string[]) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_: string, record: any) => (
      <div className="flex items-center space-x-2">
        {loading
          ? <Skeleton.Avatar active style={{ width: 36, height: 36 }} />
          : <img src={Avatar} alt="avatar" className="w-9 h-9 rounded-[50%] object-cover" />
        }
        <div>
          <p className="font-medium flex items-center">
            {loading ? <Skeleton.Input active style={{ height: 18 }} /> : record.name}
          </p>
          <p className="text-sm text-gray-500">
            {loading ? <Skeleton.Input active style={{ height: 18 }} /> : record.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_: string, record: UserPermission) => {
      const isDeleting = deletingUserIds.includes(record.id);
      return (
        <div className="flex items-center gap-2">
          {loading ? (
            <Skeleton.Button active style={{ height: 18, width: 50 }} />
          ) : (
            <EyeIcon className="text-gray-800 w-5 h-5 cursor-pointer" />
          )}
          {loading ? (
            <Skeleton.Button active style={{ height: 18, width: 50 }} />
          ) : (
            <Button loading={isDeleting} type='text' onClick={() => onDelete(record.id)}>
              {!isDeleting && (
                <TrashIcon
                  className="text-gray-800 w-5 h-5 cursor-pointer"
                />
              )}
            </Button>
          )}
        </div>
      );
    },
  },
];
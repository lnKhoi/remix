import {
  Dropdown,
  Menu,
  TableColumnsType,
} from 'antd';
import Avatar from '~/assets/avatar.jpeg';
import { UserPermission } from '~/models/User.model';

import {
  EllipsisHorizontalIcon,
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
        const menu = (
          <Menu
            onClick={({ key }) => {
              if (key === 'view') onViewUser(record.id);
              if (key === 'edit') onEditUser(record.id);
              if (key === 'delete') onDeleteUser(record.id);
            }}
          >
            <Menu.Item key="view">
              <EyeIcon className='w-5 h-5 mr-3 text-gray-800' /> View User
            </Menu.Item>
            <Menu.Item key="edit">
              <PencilSquareIcon className='w-5 h-5 mr-3 text-gray-800' /> Edit User
            </Menu.Item>
            <Menu.Item key="delete">
              <TrashIcon className='w-5 h-5 mr-3 text-gray-800' /> Delete User
            </Menu.Item>
          </Menu>
        );

        return (
          <div className="ml-2">
            <Dropdown overlay={menu} trigger={['click']} placement="topRight">
              <EllipsisHorizontalIcon className="w-5 h-5 cursor-pointer text-gray-800" />
            </Dropdown>
          </div>
        );
      },
    },
  ];

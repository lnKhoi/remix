import {
  Avatar,
  TableProps,
} from 'antd';

import { EyeIcon } from '@heroicons/react/24/outline';

export const influencerPerformanceColumns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div className='flex items-center gap-3'>
        <Avatar src='https://areajugones.sport.es/wp-content/uploads/2023/10/avatar-frontiers-of-pandora-1560x880.jpg.webp'  className='w-[36px] h-[36px] rounded-[50%]' />
        <div className='flex flex-col'>
          <p className='text-sm font-medium text-gray-800'>{text}</p>
          <p className='text-sm font-normal text-gray-500'>khoilam.dev@gmail.com</p>
        </div>
      </div>
    },
    {
      title: 'Engagement Rate',
      dataIndex: 'engagementRate',
      key: 'engagementRate',
      render: (text) => <div className='text-sm font-normal text-gray-800'>{text}%</div>
    },
    {
      title: 'Conversion Rate',
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      render: (text) => <div className='text-sm font-normal text-gray-800'>{text}%</div>
    },
    {
      title: 'Action',
      key: 'action',
      align:'center',
      render: (_, record) => (
        <div className='flex cursor-pointer items-center justify-center'><EyeIcon width={20} height={20} className='text-gray-500'/></div>
      ),
    },
  ];
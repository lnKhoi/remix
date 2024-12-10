import {
  Avatar,
  TableProps,
} from 'antd';
import { InfluencerInReport } from '~/models/report.model';

import { EyeIcon } from '@heroicons/react/24/outline';

export const influencerPerformanceColumns: TableProps['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any, record: InfluencerInReport) => <div className='flex items-center gap-3'>
      <Avatar src={record.creator?.avatarUrl} className='w-[36px] h-[36px] rounded-[50%]' />
      <div className='flex flex-col'>
        <p className='text-sm font-medium text-gray-800'>{record.creator.name}</p>
        <p className='text-sm font-normal text-gray-500'>{record.creator.email}</p>
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
    align: 'center',
    render: (_, record) => (
      <div className='flex cursor-pointer items-center justify-center'><EyeIcon width={20} height={20} className='text-gray-500' /></div>
    ),
  },
];

export const initialReport  = {
  conversionRate: 0,
  totalClicks: 0,
  totalRevenue: 0,
  totalImpressions: 0,
  engagementRate: 0,
  roi: 0,
  costPerConversion: 0,
  costPerClicks: 0,
  influencers: [],
  totalCost: 0,
  totalCtr: 0
}
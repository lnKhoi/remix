import {
  Avatar,
  TableColumnsType,
} from 'antd';
import { InfluencerInReport } from '~/models/report.model';

export const influencerPerformanceColumns:  TableColumnsType<InfluencerInReport> = [
  {
    title: 'Name',
    render: (_, record) => <div className='flex items-center gap-3'>
      <Avatar src={record.creator?.avatarUrl} className='w-[36px] h-[36px] rounded-[50%]' />
      <div className='flex flex-col items-center'>
        <p className='text-sm font-medium text-gray-800'>{record?.creator?.name}</p>
        <p className='text-sm font-normal text-gray-500'>{record?.creator?.email}</p>
      </div>
    </div>
  },
  {
    title: 'Engagement Rate',
    render: (_,record) => <div className='text-sm font-normal text-gray-800'>{record?.engagementRate}%</div>
  },
  {
    title: 'Revenue',
    render: (_,record) => <div className='text-sm font-normal text-gray-800'>${record?.totalRevenue?.toFixed(2)}</div>
  },
  {
    title: 'Clicks',
    render: (_,record) => <div className='text-sm font-normal text-gray-800'>{record?.totalClicks}</div>
  },
  {
    title: 'Cost Per Click (CPC)',
    render: (_,record) => <div className='text-sm font-normal text-gray-800'>${record?.costPerClick?.toFixed(2)}</div>
  },
  {
    title: 'Purchases',
    render: (_,record) => <div className='text-sm font-normal text-gray-800'>{record?.totalOrders}</div>
  },
  {
    title: 'Conversion Rate',
    render: (_,record) => <div className='text-sm font-normal text-gray-800'>{record?.conversionRate?.toFixed(2)}%</div>
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
  totalCtr: 0,
  cpa:0,
  totalPurchases:0
}

export const initialInfluencerOverLifeTime = {
  conversionRate: 0, totalClicks: 0, influencerAudience: null, revenue: 0, costPerClicks: 0, purchases: 0
}
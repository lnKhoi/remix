import {
  Avatar,
  Skeleton,
  TableColumnsType,
} from 'antd';
import { TabsProps } from 'antd/lib';
import { InfluencerInReport } from '~/models/report.model';

import { EyeIcon } from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';

type ColumnsProps = {
  loading: boolean,
  id: string
};

export const influencerPerformanceColumns = ({
  loading,
  id
}: ColumnsProps): TableColumnsType<InfluencerInReport> => [
    {
      title: 'Name',
      render: (_, record) =>
        <div>
          {
            loading
              ? <Skeleton.Avatar active shape='circle' />
              :
              <div className='flex items-center gap-3'>
                <Avatar src={record.creator?.avatarUrl || record?.creator?.instagramProfilePictureUrl} className='w-[36px] h-[36px] rounded-[50%]' />
                <div className='flex flex-col items-start'>
                  <p className='text-sm font-medium text-gray-800'>{record?.creator?.name}</p>
                  <p className='text-sm font-normal text-gray-500'>{record?.creator?.email}</p>
                </div>
              </div>
          }
        </div>
    },
    {
      title: 'Revenue',
      render: (_, record) =>
        <div>
          {
            loading
              ? <Skeleton.Input active size='small' />
              : <div className='text-sm font-normal text-gray-800'>${(record?.totalRevenue || 0)?.toFixed(2)}</div>
          }
        </div>
    },
    {
      title: 'ROI (%)',
      render: (_, record) =>
        <div>
          {
            loading
              ? <Skeleton.Input active size='small' />
              : <div className='text-sm font-normal text-gray-800'>{(record?.roi || 0)?.toFixed(2)}%</div>
          }
        </div>
    },
    {
      title: 'CPA',
      render: (_, record) =>
        <div>
          {
            loading
              ? <Skeleton.Input active size='small' />
              : <div className='text-sm font-normal text-gray-800'>${(record?.cpa || 0)?.toFixed(2)}</div>
          }
        </div>
    },
    {
      title: 'CTR',
      render: (_, record) =>
        <div>
          {
            loading
              ? <Skeleton.Input active size='small' />
              : <div className='text-sm font-normal text-gray-800'>{(record?.ctr || 0)?.toFixed(2)}%</div>
          }
        </div>
    },
    {
      title: 'CPC',
      render: (_, record) =>
        <div>
          {
            loading
              ? <Skeleton.Input active size='small' />
              : <div className='text-sm font-normal text-gray-800'>${(record?.costPerClick || 0)?.toFixed(2)}</div>
          }
        </div>
    },
    {
      title: 'Total Order',
      render: (_, record) =>
        <div>
          {
            loading
              ? <Skeleton.Input active size='small' />
              : <div className='text-sm font-normal text-gray-800'>{(record?.totalOrders || 0)}</div>
          }
        </div>
    },
    {
      title: 'Conversion Rate',
      render: (_, record) =>
        <div>
          {
            loading
              ? <Skeleton.Input active size='small' />
              : <div className='text-sm font-normal text-gray-800'>{record?.conversionRate?.toFixed(2)}%</div>
          }
        </div>
    },
    {
      title: 'Action',
      align: 'justify',
      render: (_, record) =>
        <Link to={`/manager/${id}/${record.creatorId}`} state={{ record }}>
          <div className='flex justify-start ml-3'>
            {
              loading
                ? <Skeleton.Input active size='small' />
                : <EyeIcon className='w-5 h-5 text-gray-800' />
            }
          </div>
        </Link>
    },
  ];

export const initialReport = {
  conversionRate: 0,
  totalClicks: 0,
  totalRevenue: 0,
  totalImpressions: 0,
  engagementRate: 0,
  roi: 0,
  costPerConversion: 0,
  costPerContentView: 0,
  costPerClicks: 0,
  contentView: 0,
  commentRate: 0,
  contentViewRate: 0,
  influencers: [],
  totalCost: 0,
  totalCtr: 0,
  cpa: 0,
  totalPurchases: 0,
  averageAddToCart: 0,
  averageOrder: 0,
  addToCartPerClick: 0,
  costPerAddToCarts: 0,
  customerBehavior: 0,
  bounceRate: 0,
  averageDuration: 0
}

export const initialInfluencerOverLifeTime = {
  conversionRate: 0, totalClicks: 0, influencerAudience: null, revenue: 0, costPerClicks: 0, purchases: 0
}

export const ReportTab: TabsProps['items'] = [
  {
    key: '1',
    label: 'Campaign Performance',
  },
  {
    key: '2',
    label: 'Influencer Performance',
  },
];
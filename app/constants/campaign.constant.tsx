import {
  Avatar,
  Skeleton,
  TableColumnsType,
} from 'antd';
import {
  FilmIcon,
  PlusCircleIcon,
} from 'lucide-react';
import DefaultAvatar from '~/assets/avatar.jpeg';
import TagColor from '~/components/ui/tagColor';
import { Order } from '~/models/shopify.model';

import { Squares2X2Icon } from '@heroicons/react/24/outline';

export const discountOptions = [
  {
    value: 'fixed',
    label: 'Fixed',
  },
  {
    value: 'percentage',
    label: 'Percentage',
  },
];


export const filterFollowerOptions = [
  {
    value: '1',
    label: 'Under 100.000'
  },
  {
    value: '2',
    label: 'From 100.000 - 200.000'
  },
  {
    value: '3',
    label: 'From 200.000 - 500.000'
  },
  {
    value: '4',
    label: 'Over 500.000'
  },
]


export const contentFormatOptions = [
  {
    icon: <Squares2X2Icon width={20} height={20} />,
    label: 'Post',
    value: 'post'
  },
  {
    icon: <FilmIcon width={20} height={20} />,
    label: 'Reel',
    value: 'reel'
  },
  {
    icon: <PlusCircleIcon width={20} height={20} />,
    label: 'Story',
    value: 'story'
  },
]

export const campaignDetailsTabs = [
  { label: 'Campaign Details', value: 'Campaign Details' },
  { label: 'Influencer', value: 'Influencer' },
  { label: 'Content', value: 'Content' },
  { label: 'Reports', value: 'Reports' },
  { label: 'Order', value: 'Order' },
]


export const orderColumns = (loading: boolean): TableColumnsType<Order> => [
  {
    title: 'Influencer name',
    dataIndex: 'influencerName',
    render: (_, record: Order) => (
      <div className="flex items-center gap-3">
        {loading ? (
          <div className="flex items-center gap-3">
            <Skeleton.Avatar active shape="circle" className="w-9 h-9" />
            <Skeleton.Input active size="small" className="w-24" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar
              src={record?.avatar || DefaultAvatar}
              className="w-9 h-9"
            />
            <span className="text-sm font-medium text-gray-800">{record?.creatorName}</span>
          </div>
        )}
      </div>
    ),
  },
  {
    title: 'Product',
    dataIndex: 'product',
    render: (_, record) => (
      <div className="flex items-center gap-3">
        {loading ? (
          <div className="flex items-center gap-3">
            <Skeleton.Input active size="small" className="w-24" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={record?.productImage}
              className="w-[42px] h-[42px] rounded-lg object-cover"
            />
            <span className="text-sm font-medium text-gray-800">{record?.productName}</span>
          </div>
        )}
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'hasAccount',
    key: 'hasAccount',
    render: (_, record) => (
      <div className="flex items-center gap-3">
        {loading ? (
          <Skeleton.Input active size="small" className="w-20" />
        ) : (
          <TagColor status={record?.status} background="#DBEAFE" color="#1D4ED8" />
        )}
      </div>
    ),
  },
  {
    title: 'Actions',
    render: (_, record) => (
      <a href={record?.shopifyLink} target="_blank" className="text-blue-500 cursor-pointer">
        {loading ? (
          <Skeleton.Input active size="small" className="w-24" />
        ) : (
          'View Details'
        )}
      </a>
    ),
  },
];

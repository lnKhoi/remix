import {
  Avatar,
  TableProps,
} from 'antd';
import {
  FilmIcon,
  PlusCircleIcon,
} from 'lucide-react';
import TagColor from '~/components/ui/tagColor';

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

export const orderColumns: TableProps['columns'] = [
  {
    title: 'Influencer name',
    dataIndex: 'influencerName',
    render: (text) => <div className="flex items-center gap-3">
      <Avatar src='https://attic.sh/y620gx2xcgmcbm9ydnmb3obtgk0u' className="w-9 h-9" />
      <span className="text-sm font-medium text-gray-800">Ralph Edward</span>
    </div>
  },
  {
    title: 'Product',
    dataIndex: 'product',
    render: (text) => <div className="flex items-center gap-3">
      <img src="https://dmgschoolproject.org/wp-content/uploads/2019/06/DMG-School-glass-blowing-process.jpg" className="w-[42px] h-[42px] rounded-lg object-cover" />
      <span className="text-sm font-medium text-gray-800">Glasses</span>
    </div>
  },
  {
    title: 'Status',
    dataIndex: 'hasAccount',
    key: 'hasAccount',
    render: (text) => {
      const registered = text === 1
      return (
        <TagColor status='Ready to ship' background='#DBEAFE' color='#1D4ED8' />
      )
    }
  },
  {
    title: 'Actions',
    render: (text) => {
      return (
       <div className='text-blue-500 cursor-pointer'>View Details</div>
      )
    }
  },
];

import {
  Avatar,
  TableProps,
} from 'antd';
import TagColor from '~/components/ui/tagColor';

export const productColumn: TableProps['columns'] = [
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
    title: 'Price',
    dataIndex: 'price',
    render: (text) =>
      <span className="text-sm font-medium text-gray-800">$26.000</span>
  },
  {
    title: 'Category',
    dataIndex: 'category',
    render: (text) =>
      <span className="text-sm font-medium text-gray-800">Skincare</span>
  },
  {
    title: 'Campaigns',
    dataIndex: 'category',
    render: (text) =>
      <span className="text-sm font-medium text-gray-800">Savings Season</span>
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

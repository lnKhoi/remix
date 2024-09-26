import { TableProps } from 'antd';
import Fb from '~/assets/facebook.svg';
import Ig from '~/assets/insta.svg';
import Tiktok from '~/assets/tiktok.svg';
import Yb from '~/assets/youtube.svg';
import { Creator } from '~/models/User.model';

export const creatorColumns: TableProps<Creator>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Platform',
    dataIndex: 'platform',
    key: 'platform',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      const isActive = text === 'active'
      return (
        <div className={`inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px]  ${isActive ? 'bg-teal-100' : 'bg-red-100'} `}>
          <div className={` w-2 h-2 rounded-[50%] ${isActive ? 'bg-teal-700' : 'bg-red-700'}`}></div>
          <span className={`text-[12px] capitalize ${isActive ? 'text-teal-700' : 'text-red-700'}`}>{text}</span>
        </div>
      )
    }
  },
];


export const socials = [
  {
    name: 'Facebook',
    icon: Fb
  },
  {
    name: 'Instagram',
    icon: Ig
  },
  {
    name: 'Youtube',
    icon: Yb
  },
  {
    name: 'Tiktok',
    icon: Tiktok
  }
]
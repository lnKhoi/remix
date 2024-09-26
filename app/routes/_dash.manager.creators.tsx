import React, { FC } from 'react';

import {
  Button,
  Table,
} from 'antd';
import { creatorColumns } from '~/constants/creator.constant';
import { Creator } from '~/models/User.model';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Creators' }]
}

const data: Creator[] = [
  {
    id:'234',
    name: 'John Brown',
    platform: 'Facebook',
    email: 'john.brown@example.com',
    country: 'USA',
    score: 85,
    status: 'active',
  },
  {
    id:'2344',
    name: 'Jim Green',
    platform: 'Twitter',
    email: 'jim.green@example.com',
    country: 'UK',
    score: 72,
    status: 'inactive',
  },
  {
    id:'23434',
    name: 'Joe Black',
    platform: 'Instagram',
    email: 'joe.black@example.com',
    country: 'Australia',
    score: 90,
    status: 'active',
  },
  {
    id:'234234',
    name: 'Lucy White',
    platform: 'LinkedIn',
    email: 'lucy.white@example.com',
    country: 'Canada',
    score: 60,
    status: 'inactive',
  },
  {
    id:'234324',
    name: 'Mark Grey',
    platform: 'TikTok',
    email: 'mark.grey@example.com',
    country: 'USA',
    score: 95,
    status: 'active',
  },
];

const Page: FC = () => {
  return (
    <div>
      <div className='flex w-full justify-end mb-5'>
      <Button type='primary'><CloudArrowDownIcon width={20} /> Import CSV</Button>
      </div>
    <Table<Creator> columns={creatorColumns} dataSource={data} />
    </div>
  )
}

export default Page;
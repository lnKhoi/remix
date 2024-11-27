import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';

import {
  Breadcrumb,
  Segmented,
} from 'antd';
import { ToastContainer } from 'react-toastify';
import MyProfile from '~/components/profile/MyProfile';
import ProfileDetails from '~/components/profile/ProfileDetails';
import { Campaign } from '~/models/Campaign.model';

import {
  Link,
  MetaFunction,
  useParams,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'My Profile' }];
};

type Tab = 'Profile Details' | 'Billing' | 'Intergration'

function page() {
  const { id } = useParams();
  const [tab, setTab] = useState<Tab>('Intergration');
  const [campaign, setCampaign] = useState<Campaign | null>(null);



  const getCampaignTab = () => {
    switch (tab) {
      case 'Profile Details':
        return <ProfileDetails/>
      case 'Billing':
        return <></>
      case 'Intergration':
        return <MyProfile/>
      default:
        break;
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className='fixed w-full'>
        <div className='relative h-[60px] items-center -ml-5 border-b border-b-gray-200 bg-white z-40 -mt-5  w-[calc(100%-200px)] px-8 flex  justify-between'>
          <Breadcrumb
            className='w-[200px]'
            items={[
              { title: <Link to={'/manager/dashboard'}>Dashboard</Link> },
              { title: <p className='text-gray-800'>My Profile</p> },
            ]}
          />
        </div>
      </div>
      <div className='mt-14'>
        <Segmented
          className='fixed z-50'
          defaultValue={tab}
          style={{ marginBottom: 8 }}
          onChange={(value) => setTab(value as Tab)}
          options={[
            { label: 'Profile Details', value: 'Profile Details' },
            { label: 'Billing', value: 'Billing' },
            { label: 'Intergration', value: 'Intergration' },
          ]}
        />
        <div className='pt-14'>{getCampaignTab()}</div>
      </div>
    </div>
  );
}

export default page;

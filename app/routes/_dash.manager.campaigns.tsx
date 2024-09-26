import React from 'react';

import CampaignCard from '~/components/campaign/campaignCard';
import { Button } from '~/components/ui/button';
import { InputSearch } from '~/components/ui/input-search';

import {
  AdjustmentsHorizontalIcon,
  ChevronUpDownIcon,
  CloudArrowDownIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import {
  Link,
  MetaFunction,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Campaigns' }]
}

function page() {

  return (
    <div>
      <div className='flex items-end justify-between'>
        <div className='flex flex-col'>
          <h2 className='text-2xl text-gray-900'>Campaigns</h2>
          <p className='text-sm text-gray-500 mt-1'>Manage your campaigns and view their sales performance.</p>
        </div>
        <Link to='/manager/campaign/add-campaign'>
        <Button  type='button' size='sm' >
          <PlusIcon className='mr-1' color='white' width={20} />  Add Campaign
        </Button>
        </Link>
      </div>
      <div className='mt-5 flex items-end justify-between'>
        <InputSearch placeholder='Campaign name' className='w-[300px] h-[36px] ' />
        <div className='flex items-center gap-3'>
          <button className='bg-[#F3F4F6] px-3 justify-between flex items-center px hover:bg-[#D1D5DB] transition-all text-sm h-[36px] w-[123px] font-semibold rounded-[12px] text-[#1F2937]'>
            All Status
            <ChevronUpDownIcon width={16} />
          </button>
          <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[87px] font-semibold rounded-[12px] text-[#1F2937]'>
            <AdjustmentsHorizontalIcon width={16} />  Filter
          </button>
          <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[87px] font-semibold rounded-[12px] text-[#1F2937]'>
            <CloudArrowDownIcon width={16} />  Export
          </button>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6 mt-5'>
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
      </div>
    </div>
  )
}

export default page

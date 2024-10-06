import React, {
  useEffect,
  useState,
} from 'react';

import { getContentsInCampaign } from '~/apis/campaign';
import { Campaign } from '~/models/Campaign.model';
import { Content } from '~/models/Content.model';

import {
  CalendarDaysIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';

import ContentCard from '../content/ContentCard';

type ContentProps = {
  campaign: Campaign | null
}

function Content({ campaign }: ContentProps) {
  const [contents,setContents] = useState<Content[]>([])

  const handleGetListContents = async () => {
    await getContentsInCampaign(campaign?.id as string, 100, 1).then((res) => setContents(res?.data?.data))
  }

  useEffect(() => {
    handleGetListContents()
  }, [])


  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <h5 className='text-xl text-gray-800'>Influencer Content ({contents?.length})</h5>
        <div className='flex items-center gap-3'>
          <button className='bg-[#F3F4F6] px-3 justify-between flex items-center px hover:bg-[#D1D5DB] transition-all text-sm h-[36px] w-[105px] font-normal rounded-[9px] text-[#1F2937]'>
            All Status
            <ChevronUpDownIcon width={16} />
          </button>
          <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[130px] font-normal rounded-[9px] text-[#1F2937]'>
            <ChevronUpDownIcon width={16} /> All Influencers
          </button>
          <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[107px] font-normal rounded-[9px] text-[#1F2937]'>
            <CalendarDaysIcon width={16} />  Any Date
          </button>
        </div>
      </div>
      <div className='mt-5 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-5'>
        {contents.map(c => (
          <ContentCard content={c} key={c.id} />
        ))}

      </div>
    </div>
  )
}

export default Content

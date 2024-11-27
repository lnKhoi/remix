import React, {
  useEffect,
  useState,
} from 'react';

import { Tabs } from 'antd';
import { getContentsInCampaign } from '~/apis/campaign';
import { Campaign } from '~/models/Campaign.model';
import type { Content } from '~/models/Content.model';

import {
  CalendarDaysIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';

import ContentCard from '../content/ContentCard';

type ContentProps = {
  campaign: Campaign | null
}

function Content({ campaign }: ContentProps) {
  const [filteredContent, setFilteredContent] = useState<Content[]>([])
  const [contents, setContents] = useState<Content[]>([])
  const [tab,setTab] = useState<string>('Influencer Contents') 

  const handleGetListContents = async () => {
    await getContentsInCampaign(campaign?.id as string, 100, 1).then((res) => {
      setContents(res?.data?.data);
      setFilteredContent(res?.data?.data)
    })
  }

  useEffect(() => {
    handleGetListContents()
  }, [])

  const handleFilterContent = (f: string) => {
    setTab(f)
    const filter = contents.filter(e => f == 'Influencer Contents' ? contents : e.approved === 'posted')
    setFilteredContent(filter)
  }

  return (
    <div className='w-full'>
      <Tabs
        defaultActiveKey="1"
        onChange={(e) => handleFilterContent(e)}
        items={[
          {
            label: 'Influencer Contents',
            key: 'Influencer Contents',
          },
          {
            label: 'Live Posts',
            key: 'Live Posts',
          },
        ]}
      />
      <div className='flex items-center justify-between'>
        <h5 className='text-xl text-gray-800'>{tab} ({filteredContent?.length})</h5>
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
        {filteredContent?.map(c => (
          <ContentCard content={c} key={c.id} />
        ))}
      </div>
    </div>
  )
}

export default Content

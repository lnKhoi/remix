import React, {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Table,
  TableProps,
  Tabs,
  TabsProps,
} from 'antd';
import {
  brandUpdateInvitationStatus,
  getInfluencerParticipantsInCampaign,
} from '~/apis/campaign';
import NoInfluencer from '~/assets/no-influencer.png';
import { influencersParticipantsColumns } from '~/constants/creator.constant';
import { Campaign } from '~/models/Campaign.model';
import { InfluencerInCampaign } from '~/models/User.model';

import {
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  ChevronUpDownIcon,
  UserPlusIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import { InputSearch } from '../ui/input-search';

const items: TabsProps['items'] = [
  { key: '', label: 'Influencer Participants' },
  { key: 'brand_declined_influencer', label: 'Influencer Rejected' },
];

const rowSelection: TableProps<InfluencerInCampaign>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: InfluencerInCampaign[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

type InfluencerProps = {
  campaign: Campaign | null
}

function Influencer({ campaign }: InfluencerProps) {
  const [tab, setTab] = useState<'' | 'brand_declined_influencer'>('')
  const [influencers,setInfluencers] = useState<InfluencerInCampaign[]>([])

  const handleGetInfluencersInCampaign = async () => {
    await getInfluencerParticipantsInCampaign(tab, campaign?.id as string, 100, 1)
      .then((res) => setInfluencers(res?.data?.data))
  }

  useEffect(() => {
    handleGetInfluencersInCampaign()
  }, [tab])

  const handleApprove = async (influencerId: string):Promise<void> => {
    await brandUpdateInvitationStatus(campaign?.id as string,influencerId,true)
    .then(() => {
      handleGetInfluencersInCampaign()
    })   
  }

  const handleReject = async (influencerId: string):Promise<void> => {
    await brandUpdateInvitationStatus(campaign?.id as string,influencerId,false)
    .then(() => {
      handleGetInfluencersInCampaign()
    })  
  }

  
  console.log(influencers)
  return (
    <div>
      <Tabs defaultActiveKey="" items={items} onChange={(e) => setTab(e as any)} />
      <div className='mt-2 flex items-end justify-between'>
        <div className='flex items-center gap-2'>
          <InputSearch placeholder='Influencer name' className='w-[300px] mt-[1px] h-[36px] ' />
          <button className='bg-[#F3F4F6] px-3 justify-between flex items-center px hover:bg-gray-200 transition-all text-sm h-[36px] w-[105px] font-normal rounded-[9px] text-gray-400'>
            <XCircleIcon className='text-gray-400' width={16} />
            Reject all
          </button>
          <button className='bg-[#F3F4F6] px-3 justify-between flex items-center px hover:bg-gray-200 transition-all text-sm h-[35px] w-[120px] font-normal rounded-[9px] text-gray-400'>
            <CheckCircleIcon className='text-gray-400' width={16} />
            Approve all
          </button>
        </div>
        <div className='flex items-center gap-3'>
          <button className='bg-[#F3F4F6] px-3 justify-between flex items-center px hover:bg-[#D1D5DB] transition-all text-sm h-[35px] w-[123px] font-normal rounded-[9px] text-[#1F2937]'>
            All Status
            <ChevronUpDownIcon width={16} />
          </button>
          <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[35px] w-[87px] font-normal rounded-[9px] text-[#1F2937]'>
            <AdjustmentsHorizontalIcon width={16} />  Filter
          </button>
        </div>
      </div>
      {/* Influeners Table */}
      <div className='mt-6'>
      <Table<InfluencerInCampaign>
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            columns={influencersParticipantsColumns({ handleApprove, handleReject })} // Pass the handlers
            dataSource={influencers}
            locale={{emptyText: (
              <div className='w-full flex flex-col items-center justify-center'>
            <img src={NoInfluencer} alt="no data" />
            <Button
              // onClick={() => setModalInvite(true)}
              className='bg-gray-100 mt-3 hover:bg-gray-400 border-gray-100'
              type='text'
            >
              <div className='flex items-center gap-1'>
                <UserPlusIcon className='bg-gray-100' width={20} />
                Invite Influencer
              </div>
            </Button>
          </div>
            )}}
          />
       

      </div>
    </div>
  )
}

export default Influencer;

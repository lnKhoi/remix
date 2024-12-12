import 'react-toastify/dist/ReactToastify.css';

import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import debounce from 'lodash/debounce';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import { getCampaigns } from '~/apis/campaign';
import NoCampaigns from '~/assets/no-campaign.png';
import CampaignCard from '~/components/campaign/campaignCard';
import ReviewCard from '~/components/custom/skeletons/CampaignCard';
import { Button } from '~/components/ui/button';
import { InputSearch } from '~/components/ui/input-search';
import { Campaign } from '~/models/Campaign.model';

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
import { useScrollLoadMore } from '~/hooks/useScrollLoadMore';

export const meta: MetaFunction = () => {
  return [{ title: 'Campaigns' }]
}

function Campaigns() {
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<string>('')
  const [campaigns, setCampagins] = useState<Campaign[]>([])
  const [params, setParams] = useState<{ page: number, limit: number }>({ page: 1, limit: 2 })
  const [totalCampaign, setTotalCampaign] = useState<number>(0)

  const { containerRef, handleScroll } = useScrollLoadMore({
    onLoadMore: () => {
      if (totalCampaign === campaigns.length && campaigns.length !== 0) {
        return setLoading('off-loading')
      }
      handleGetCampaigns();
    },
  })

  const handleGetCampaigns = async (): Promise<void> => {
    loading === '' ? setLoading('loading') : setLoading('load-more')
    setParams((prev) => ({ ...prev, limit: prev.limit + 1 }));
    await getCampaigns(params.limit, params.page, search)
      .then(res => {
        setCampagins(res?.data?.data)
        setTotalCampaign(res?.data?.total);
      })
      .catch(err => toast.error(err?.message))
      .finally(() => {
        setLoading('off-loading')
      })
  }

  useEffect(() => {
    handleGetCampaigns()
  }, [search])

  const handleReloadCampagins = (): void => {
    handleGetCampaigns()
  }

  const handleSearchCampaigns = debounce(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSearch(e.target.value);
    }, 500);

  return (
    <div>
      <ToastContainer />
      <div className='flex items-end justify-between'>
        <div className='flex flex-col'>
          <h2 className='text-2xl text-gray-900'>Campaigns</h2>
          <p className='text-sm text-gray-500 mt-1'>Manage your campaigns and view their sales performance.</p>
        </div>
        <Link to='/manager/campaign/add-campaign'>
          <Button type='button' size='sm' >
            <PlusIcon className='mr-1' color='white' width={20} />  Add Campaign
          </Button>
        </Link>
      </div>
      <div className='mt-5 flex items-end justify-between'>
        <InputSearch onChange={(e) => handleSearchCampaigns(e)} placeholder='Campaign name' className='w-[300px] h-[36px] ' />
        <div className='flex items-center gap-3'>
          <button className='bg-[#F3F4F6] px-3 justify-between flex items-center px hover:bg-[#D1D5DB] transition-all text-sm h-[36px] w-[105px] font-normal rounded-[9px] text-[#1F2937]'>
            All Status
            <ChevronUpDownIcon width={16} />
          </button>
          <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[87px] font-normal rounded-[9px] text-[#1F2937]'>
            <AdjustmentsHorizontalIcon width={16} />  Filter
          </button>
          <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[87px] font-normal rounded-[9px] text-[#1F2937]'>
            <CloudArrowDownIcon width={16} />  Export
          </button>
        </div>
      </div>

      {loading === 'loading'
        ? <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5 mt-5'>
          {Array?.from({ length: 16 }).map((s, idx) => <ReviewCard key={idx} />)}
        </div>
        : <div ref={containerRef} onScroll={handleScroll} className='overflow-auto' style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {campaigns?.length === 0 && (
            <div className='flex items-center flex-col gap-3 justify-center w-full h-[calc(100vh-200px)]'>
              <img src={NoCampaigns} className='w-[370px]' />
              <Link to='/manager/campaign/add-campaign'>
                <Button className='h-[36px]' ><PlusIcon width={20} /> Add Campaign</Button>
              </Link>
            </div>
          )}
          <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5 mt-5'>
            {campaigns?.map((c) => (
              <CampaignCard onReload={handleReloadCampagins} key={c.id} campaign={c} />
            ))}
          </div>
          {loading === 'load-more' && (
            <div className="flex justify-center items-center mt-2">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-900 rounded-full border-t-transparent" role="status" />
            </div>
          )}

        </div>
      }
    </div>
  )
}

export default Campaigns

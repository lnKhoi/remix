import React, {
  useEffect,
  useState,
} from 'react';

import {
  Avatar,
  Button,
  Modal,
  Table,
} from 'antd';
import CountUp from 'react-countup';
import { getInstagramStatistics } from '~/apis/campaign';
import {
  getCampaignConversionRate,
  getCampaignROI,
} from '~/apis/reports';
import UserAvatar from '~/assets/avatar.jpeg';
import { influencerPerformanceColumns } from '~/constants/report.constant';
import { Campaign } from '~/models/Campaign.model';
import { ReportCampaign } from '~/models/report.model';
import { InfluencerPerformance } from '~/models/User.model';

import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

import LineChart from '../custom/charts/LineChart';

type ReportsProps = {
  campaign: Campaign | null
}
const data = [
  {
    key: '1',
    name: 'Alice Johnson',
    engagementRate: 28,
    address: 'Los Angeles No. 5 Sunset Boulevard',
  },
  {
    key: '2',
    name: 'Bob Martin',
    engagementRate: 45,
    conversionRate: 37.2,
  },
  {
    key: '3',
    name: 'Charlie Davis',
    engagementRate: 30,
    conversionRate: 22.8,
    address: 'Chicago No. 8 Oak Street',
  },
  {
    key: '4',
    name: 'David Harris',
    engagementRate: 20,
    conversionRate: 11.1,
  },
  {
    key: '5',
    name: 'Eve Lewis',
    engagementRate: 35,
    conversionRate: 40.5,
  },
  {
    key: '6',
    name: 'Frank Clark',
    engagementRate: 22,
    address: 'San Francisco No. 10 Golden Gate',
  },
  {
    key: '7',
    name: 'Grace Lee',
    engagementRate: 50,
    conversionRate: 55.4,
    address: 'Houston No. 3 Space Center',
  },
  {
    key: '8',
    name: 'Henry Young',
    engagementRate: 18,
    conversionRate: 9.3,
  },
  {
    key: '9',
    name: 'Ivy Scott',
    engagementRate: 40,
    conversionRate: 28.9,
    address: 'Miami No. 7 Ocean Drive',
  },
  {
    key: '10',
    name: 'Jack King',
    engagementRate: 32,
    conversionRate: 15.2,
  },
];

function Reports({ campaign }: ReportsProps) {
  const [totalConversionRate,setTotalConversionRate] = useState<number>(0)
  const [totalROI,setTotalROI] = useState<number>(0)
  const [campaignReport,setCampaignReport] = useState<null | ReportCampaign>(null)
  const [modal, setModal] = useState<boolean>(false)
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerPerformance | null>(null)

  const handleViewInfluencerProfile = (influencer: InfluencerPerformance) => {
    setModal(!modal)
    setSelectedInfluencer(influencer)
  }

  const handleGetIGReport = async () => {
    const [igStats, roi, conversionRate] = await Promise.all([
       getInstagramStatistics(campaign?.id as string),
       getCampaignROI(campaign?.id as string),
       getCampaignConversionRate(campaign?.id as string),
    ]);
 
    setCampaignReport(igStats.data);
    setTotalROI(roi?.data?.roi);
    setTotalConversionRate(conversionRate?.data?.roi);
 };
 

  useEffect(() => {
    handleGetIGReport()
  },[])

  return (
    <div className='w-full'>
      <div className='my-6 px-4 py-3 border border-gray-200 rounded-xl'>
        <h6 className='text-2xl font-semibold'>Revenue</h6>
       <p className='text-xs text-gray-500 mt-2'>Total</p>
       <p className='font-semibold text-[30px] text-gray-800 my-3'>$12.243</p>
      <LineChart/>
      </div>
      <div className='grid xl:grid-cols-7 grid-cols-3 gap-4'>
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Total Impression</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={campaignReport?.totalImpressions || 0} />
          </span>
        </div>

        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Engagement Rate</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={campaignReport?.engagementRate || 0} />%
          </span>
        </div>
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Conversion Rate</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={totalConversionRate} />%
          </span>
        </div>
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>ROI</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={totalROI} />%
          </span>
        </div>

        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Total Clicks</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={15} />%
          </span>
        </div>
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Cost Per Click</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={15} />%
          </span>
        </div>
         <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Cost Per Conversion</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={15} />%
          </span>
        </div>
      </div>
      {/* Influencer Performance */}
      <h2 className='mt-6 text-2xl font-medium text-gray-800'>Influencer Performance</h2>
      <p className='text-sm mt-1 text-gray-700'>Manage your content and view their sales performance.</p>
      <div className='mt-6'>
        <Table onRow={(record) => ({
          onClick: () => handleViewInfluencerProfile(record as InfluencerPerformance),
        })} columns={influencerPerformanceColumns} dataSource={data} />;
      </div>
      <Modal footer={null} width={650} open={modal} onCancel={() => setModal(false)}>
        <div className='flex items-center gap-5'>
          <Avatar src={UserAvatar} className='w-[128px] h-[128px] rounded-[50%]' />
          <div className='flex flex-col'>
            <p className='text-2xl font-semibold'>{selectedInfluencer?.name}</p>
            <span className='text-sm mt-[2px] font-normal text-gray-500'>khoilam.dev@gmail.com</span>
            <Button className='h-[36px] mt-3 w-[86px]' type='primary'>Live Posts</Button>
          </div>
        </div>
        <div className='mt-8'>
          <div className='flex items-center justify-between'>
            <p className='text-lg font-semibold'>Post Performance</p>
            <button className='bg-gray-100 px-3 justify-between flex items-center px hover:bg-gray-300 transition-all text-sm h-[36px] w-[144px] font-normal rounded-[9px] text-gray-800'>
              All Status
              <ChevronUpDownIcon width={16} />
            </button>
          </div>
        </div>
        <div className='mt-5 grid grid-cols-3 gap-5'>
          <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
            <p className='text-2xl font-semibold'>123,343</p>
            <p className='mt-3 text-gray-500 text-sm font-medium'>Total Impression</p>
          </div>
          <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
            <p className='text-2xl font-semibold'>12.4%</p>
            <p className='mt-3 text-gray-500 text-sm font-medium'>Conversion Rate</p>
          </div>
          <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
            <p className='text-2xl font-semibold'>12.2%</p>
            <p className='mt-3 text-gray-500 text-sm font-medium'>Engagement Rate</p>
          </div>
          <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
            <p className='text-2xl font-semibold'>14.33%</p>
            <p className='mt-3 text-gray-500 text-sm font-medium'>ROI</p>
          </div>
          <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
            <p className='text-2xl font-semibold'>25.5%</p>
            <p className='mt-3 text-gray-500 text-sm font-medium'>Likes</p>
          </div>
          <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
            <p className='text-2xl font-semibold'>123.203</p>
            <p className='mt-3 text-gray-500 text-sm font-medium'>Reach</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Reports

import React, {
  useEffect,
  useState,
} from 'react';

import { Table } from 'antd';
import CountUp from 'react-countup';
import { getInstagramStatistics } from '~/apis/campaign';
import {
  getCampaignConversionRate,
  getCampaignROI,
  getCostPerClicks,
  getCostPerConversion,
  getInfluencerInReport,
} from '~/apis/reports';
import { influencerPerformanceColumns } from '~/constants/report.constant';
import { Campaign } from '~/models/Campaign.model';
import { ReportCampaign } from '~/models/report.model';
import { InfluencerPerformance } from '~/models/User.model';

import LineChart from '../custom/charts/LineChart';
import InfluencerProfile from '../profile/InfluencerProfile';

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
  const [reportData, setReportData] = useState<ReportCampaign>({
    conversionRate: 0,
    totalClicks: 0,
    totalRevenue: 0,
    totalImpressions: 0,
    engagementRate: 0,
    roi: 0,
    costPerConversion: 0,
    costPerClicks: 0,
    influencers: []
  })

  const [modal, setModal] = useState<boolean>(false)
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerPerformance | null>(null)

  const handleViewInfluencerProfile = (influencer: InfluencerPerformance) => {
    setModal(!modal)
    setSelectedInfluencer(influencer)
  }

  const handleGetIGReport = async () => {
    const [igStats, roi, conversionRate, costPerConversion, costperClicks,influencers] = await Promise.all([
      getInstagramStatistics(campaign?.id as string),
      getCampaignROI(campaign?.id as string),
      getCampaignConversionRate(campaign?.id as string),
      getCostPerConversion(campaign?.id as string),
      getCostPerClicks(campaign?.id as string),
      getInfluencerInReport(campaign?.id as string)
    ]);

    setReportData({
      ...reportData,
      roi: roi?.data?.roi,
      totalClicks: conversionRate?.data?.totalClicks,
      conversionRate: conversionRate?.data?.conversionRate,
      totalImpressions: igStats?.data?.totalImpressions,
      engagementRate: igStats?.data?.engagementRate,
      totalRevenue: roi.data?.totalRevenue,
      costPerConversion: costPerConversion?.data?.costPerConversion,
      costPerClicks: costperClicks?.data?.costPerClick,
      influencers:influencers?.data?.data
    })
  };

  useEffect(() => {
    handleGetIGReport()
  }, [])

  console.log(reportData.influencers)

  return (
    <div className='w-full'>
      <div className='my-6 px-4 py-3 border border-gray-200 rounded-xl'>
        <h6 className='text-2xl font-semibold'>Revenue</h6>
        <p className='text-xs text-gray-500 mt-2'>Total</p>
        <p className='font-semibold text-[30px] text-gray-800 my-3'>$
          <CountUp decimals={reportData?.totalRevenue === 0 ? 0 : 2} end={reportData?.totalRevenue} />
        </p>
        <LineChart />
      </div>
      <div className='grid xl:grid-cols-7 grid-cols-3 gap-4'>
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Total Impression</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={reportData.totalImpressions || 0} />
          </span>
        </div>

        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Engagement Rate</h5>
          <span className='text-2xl font-bold'>
            <CountUp decimals={reportData?.engagementRate == 0 ? 0 : 1} end={reportData?.engagementRate || 0} />%
          </span>
        </div>
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Conversion Rate</h5>
          <span className='text-2xl font-bold'>
            <CountUp decimals={reportData?.conversionRate == 0 ? 0 : 1} end={reportData?.conversionRate} />%
          </span>
        </div>
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>ROI</h5>
          <span className='text-2xl font-bold'>
            <CountUp decimals={reportData?.roi === 0 ? 0 : 1} end={reportData?.roi} />%
          </span>
        </div>

        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Total Clicks</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={reportData?.totalClicks} />
          </span>
        </div>
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Cost Per Click</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={reportData?.costPerClicks} />%
          </span>
        </div>
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-2xl flex items-start flex-col h-[109px]'>
          <h5 className=' text-gray-800 text-xs'>Cost Per Conversion</h5>
          <span className='text-2xl font-bold'>
            <CountUp end={reportData.costPerConversion} />%
          </span>
        </div>
      </div>
      {/* Influencer Performance */}
      <h2 className='mt-6 text-2xl font-medium text-gray-800'>Influencer Performance</h2>
      <p className='text-sm mt-1 text-gray-700'>Manage your content and view their sales performance.</p>
      <div className='mt-6'>
        <Table 
        onRow={(record) => ({
          onClick: () => handleViewInfluencerProfile(record as InfluencerPerformance),
        })}
         columns={influencerPerformanceColumns} 
         dataSource={reportData?.influencers} />
      </div>
      {modal && (
        <InfluencerProfile
          campaignId={campaign?.id as string}
          inluencerId={selectedInfluencer?.creator?.id}
          onClose={() => setModal(false)}
          open={modal} />
      )}

    </div>
  )
}

export default Reports

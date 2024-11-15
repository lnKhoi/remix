import React, {
  useEffect,
  useState,
} from 'react';

import {
  Avatar,
  Button,
  Modal,
} from 'antd';
import CountUp from 'react-countup';
import {
  getInfluencerConversion,
  getInfluencerTotalClick,
} from '~/apis/creator';
import { getIGAudienceOfInfluencer } from '~/apis/reports';

import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

type InfluencerProfileProps = {
    open: boolean,
    onClose: () => void
    campaignId: string
    inluencerId: string
}

function InfluencerProfile({ open, onClose, campaignId, inluencerId }: InfluencerProfileProps) {
    const [report, setReport] = useState({ conversionRate: 0, totalClicks: 0,influencerAudience:null })

    const handleGetIGReport = async () => {
        const [conversionRate, totalClicks,influencerAudience] = await Promise.all([
            getInfluencerConversion(campaignId, inluencerId),
            getInfluencerTotalClick(campaignId, inluencerId),
            getIGAudienceOfInfluencer(campaignId,inluencerId)
        ]);

        setReport({
            ...report,
            conversionRate: conversionRate?.data?.conversionRate,
            totalClicks: totalClicks?.data?.totalClicks,
            influencerAudience:influencerAudience?.data
        })
    };

    useEffect(() => {
        handleGetIGReport()
    }, [])

    console.log(report.influencerAudience)
    

    return (
        <Modal footer={null} width={650} open={open} onCancel={() => onClose()}>
            <div className='flex items-center gap-5'>
                <Avatar src={report?.influencerAudience?.creator?.avatarUrl} className='w-[128px] h-[128px] rounded-[50%]' />
                <div className='flex flex-col'>
                    <p className='text-2xl font-semibold'>{report?.influencerAudience?.creator?.name}</p>
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
                    <p className='text-2xl font-semibold'>---</p>
                    <p className='mt-3 text-gray-500 text-sm font-medium'>Revenue</p>
                </div>
                <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
                    <p className='text-2xl font-semibold'>{report.influencerAudience?.totalImpressions?.toFixed(2)}%</p>
                    <p className='mt-3 text-gray-500 text-sm font-medium'>Total Impressions</p>
                </div>
                <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
                    <CountUp className='text-2xl font-semibold' end={report?.conversionRate} />
                    <p className='mt-3 text-gray-500 text-sm font-medium'>Conversion Rate</p>
                </div>
                <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
                    <p className='text-2xl font-semibold'>{report?.influencerAudience?.engagementRate?.toFixed(2)}%</p>
                    <p className='mt-3 text-gray-500 text-sm font-medium'>Engagement Rate</p>
                </div>
                <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
                    <CountUp className='text-2xl font-semibold' end={report?.totalClicks} />
                    <p className='mt-3 text-gray-500 text-sm font-medium'>Clicks</p>
                </div>
                <div className='rounded-2xl bg-gray-100 h-[93px] p-4'>
                    <p className='text-2xl font-semibold'>{report.influencerAudience?.totalLikes}</p>
                    <p className='mt-3 text-gray-500 text-sm font-medium'>Likes</p>
                </div>
            </div>
        </Modal>
    )
}

export default InfluencerProfile

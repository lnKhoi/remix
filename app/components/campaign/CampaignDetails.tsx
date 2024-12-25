import React from 'react';

import { Skeleton } from 'antd';
import dayjs from 'dayjs';
import facebookIcon from '~/assets/facebook.svg';
import instagramIcon from '~/assets/insta.svg';
import tiktokIcon from '~/assets/tiktok.svg';
import youtubeIcon from '~/assets/youtube.svg';
import { DATE_TIME_FORMAT_V2 } from '~/constants/time.constant';
import { Campaign } from '~/models/Campaign.model';
import Editor from '~/plugins/editor';

import { TicketIcon } from '@heroicons/react/24/outline';

type CampaignDetailsProps = {
  campaign: Campaign | null
  loading: boolean
}

export const socialMediaIcons: { [key: string]: string } = {
  facebook: facebookIcon,
  instagram: instagramIcon,
  youtube: youtubeIcon,
  tiktok: tiktokIcon
};


function CampaignDetails({ campaign, loading }: CampaignDetailsProps) {

  const totalInfluencerBudget = campaign?.maximumParticipants * campaign?.budget
  const totalCommissionFee = totalInfluencerBudget * 0.15
  const totalBudget = totalCommissionFee + totalInfluencerBudget

  return (
    <div className='flex items-start justify-between gap-3 2xl:w-[1316px] w-full'>
      <div className='w-[68%]'>
        <h2 className='text-2xl text-gray-900 font-semibold'>
          {loading ? <Skeleton.Button active style={{ width: 180 }} /> : campaign?.name}
        </h2>
        <p className='text-gray-800 mt-5 mb-2 font-semibold'>Social Media</p>
        <div className='flex items-center gap-2'>
          {loading
            ? <>
              {[1, 2].map(l => <Skeleton.Avatar key={l} shape='circle' active style={{ width: 22, height: 22 }} />)}
            </>
            : campaign?.socialMedia.map(s => (
              <img key={s} src={socialMediaIcons[s]} alt={s} />
            ))}

        </div>
        <div className='w-full hide-toolbar'>
          <h6 className='text-gray-800 text-[20px] mt-6 mb-5 font-semibold'>Campaign Overview</h6>
          {loading ? <Skeleton.Button block style={{ height: 400 }} active />
            : <>
              {campaign?.campaignOverview && (
                <Editor disabled value={campaign?.campaignOverview as string} />
              )}</>}
        </div>
      </div>
      <div className='w-[32%] border border-gray-200 rounded-xl p-5 h-[440px]'>
        <h6 className='text-gray-800 font-semibold mb-3'>Campaign Deadline</h6>
        <div className='flex items-center justify-between'>
          <span className='text-gray-500'>End date</span>
          <span className='text-gray-800 font-semibold'>
            {loading
              ? <Skeleton.Input size='small' active />
              : dayjs(campaign?.deadline).format(DATE_TIME_FORMAT_V2)
            }
          </span>
        </div>
        <h6 className='font-semibold text-gray-800 mb-3 mt-4'>Discount</h6>
        <div className='h-[48px] w-full rounded-xl flex gap-2 items-center p-3 bg-rose-100'>
          <TicketIcon className='text-rose-500 w-[20px]' />
          {loading
            ? <Skeleton.Input size='small' active />
            : <span className='font-semibold text-gray-800'>{campaign?.discountValue} {campaign?.discountType === 'percentage' ? '%' : '$'} Discount </span>
          }
        </div>

        <h6 className='font-semibold text-gray-800 mb-3 mt-4'>Total campaign budget</h6>
        {loading
          ? <Skeleton.Button size='small' style={{ borderRadius: 8, height: 28, width: 25 }} active />
          : <div className='h-[28px] inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
            ${totalBudget.toFixed(2)}
          </div>
        }

        <div className='flex '>
          <div className='flex flex-col'>
            <h6 className='font-semibold text-gray-800 mb-3 mt-4'>Influencer Budget</h6>
            {loading
              ? <Skeleton.Button size='small' style={{ borderRadius: 8, height: 28, width: 25 }} active />
              : <div className='h-[28px] inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
                ${totalInfluencerBudget?.toFixed(2)}
              </div>
            }
          </div>
          <div className='flex ml-5 flex-col'>
            <h6 className='font-semibold text-gray-800 mb-3 mt-4'>Commission fee</h6>
            {loading
              ? <Skeleton.Button size='small' style={{ borderRadius: 8, height: 28, width: 25 }} active />
              : <div className='h-[28px] inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
                ${totalCommissionFee}
              </div>
            }
          </div>
        </div>
        <h6 className='font-semibold text-gray-800 mb-3 mt-4'>Campaign Demographic</h6>
        {loading
          ? <div className='flex items-center flex-wrap gap-2'>
            {[1, 2, 3].map(l => <Skeleton.Button key={l} size='small' style={{ borderRadius: 8, height: 28, width: 95 }} active />)}
          </div>
          : <div className='flex items-center flex-wrap gap-2'>
            <div className='h-[28px] inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
              Age: {campaign?.ages?.map(a => <span key={a}>{a} </span>)} years
            </div>
            <div className='h-[28px] capitalize inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
              {campaign?.gender}
            </div>
            <div className='h-[28px] capitalize inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
              {campaign?.location}
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default CampaignDetails

import React from 'react';

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
}

export const socialMediaIcons: { [key: string]: string } = {
  facebook: facebookIcon,
  instagram: instagramIcon,
  youtube: youtubeIcon,
  tiktok: tiktokIcon
};


function CampaignDetails({ campaign }: CampaignDetailsProps) {

  return (
    <div className='flex items-start justify-between gap-3 2xl:w-[1316px] w-full'>
      <div className='w-[68%]'>
        <h2 className='text-2xl text-gray-900 font-semibold'>{campaign?.name}</h2>
        <p className='text-gray-800 mt-5 mb-2 font-semibold'>Social Media</p>
        <div className='flex items-center gap-2'>
          {campaign?.socialMedia.map(s => (
            <img key={s} src={socialMediaIcons[s]} alt={s} />
          ))}
        </div>
        <div className='w-full hide-toolbar'>
          <h6 className='text-gray-800 text-[20px] mt-6 mb-5 font-semibold'>Campaign Overview</h6>
         {campaign?.campaignOverview && (
           <Editor value={campaign?.campaignOverview as string} />
         )}
        </div>
      </div>
      <div className='w-[32%] border border-gray-200 rounded-xl p-5 h-[350px]'>
        <h6 className='text-gray-800 font-semibold mb-3'>Campaign Deadline</h6>
        <div className='flex items-center justify-between'>
          <span className='text-gray-500'>End date</span>
          <span className='text-gray-800 font-semibold'>{dayjs(campaign?.deadline).format(DATE_TIME_FORMAT_V2)}</span>
        </div>
        <h6 className='font-semibold text-gray-800 mb-3 mt-4'>Discount</h6>
        <div className='h-[48px] w-full rounded-xl flex gap-2 items-center p-3 bg-rose-100'>
          <TicketIcon className='text-rose-500 w-[20px]' />
          <span className='font-semibold text-gray-800'>{campaign?.discountValue} {campaign?.discountType === 'percentage' ? '%' : '$'} Discount </span>
        </div>
        <h6 className='font-semibold text-gray-800 mb-3 mt-4'>Campaign Budget</h6>
        <div className='h-[28px] inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
          ${campaign?.budget}
        </div>
        <h6 className='font-semibold text-gray-800 mb-3 mt-4'>Campaign Demographic</h6>
        <div className='flex items-center gap-2'>
          <div className='h-[28px] inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
            Age: {campaign?.age?.[0]} - {campaign?.age?.[1]} years
          </div>
          <div className='h-[28px] capitalize inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
            {campaign?.gender}
          </div>
          <div className='h-[28px] capitalize inline-flex rounded-lg text-gray-700 text-[12px]  gap-2 items-center  justify-center bg-gray-200 py-[6px] px-3'>
            {campaign?.location}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails

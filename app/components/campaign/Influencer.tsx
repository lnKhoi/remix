import React from 'react';

import { Button } from 'antd';
import {
  getColorInfluencerContent,
  InfluencerContentStatus,
} from '~/helpers/campaign.helper';
import { Campaign } from '~/models/Campaign.model';

import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

type InfluencerProps = {
  campaign: Campaign | null
}

// MOCK DATA
const influencers = [
  {
    name: 'Ralph Edwards',
    avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
    email: 'khoilam.dev@gmail.com',
    score: 234,
    follower: 500,
    status: 'waiting to accept'
  },
  {
    name: 'Ralph Edwards',
    avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
    email: 'khoilam.dev@gmail.com',
    score: 23,
    follower: 340,
    status: 'declined'
  },
  {
    name: 'Ralph Edwards',
    avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
    email: 'khoilam.dev@gmail.com',
    score: 24,
    follower: 200,
    status: 'rejected'
  },
  {
    name: 'Ralph Edwards',
    avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
    email: 'khoilam.dev@gmail.com',
    score: 234,
    follower: 500,
    status: 'waiting to accept'
  },
  {
    name: 'Ralph Edwards',
    avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
    email: 'khoilam.dev@gmail.com',
    score: 23,
    follower: 340,
    status: 'declined'
  },
  {
    name: 'Ralph Edwards',
    avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
    email: 'khoilam.dev@gmail.com',
    score: 24,
    follower: 200,
    status: 'rejected'
  },
  {
    name: 'Ralph Edwards',
    avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
    email: 'khoilam.dev@gmail.com',
    score: 23,
    follower: 340,
    status: 'review'
  },
  {
    name: 'Ralph Edwards',
    avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
    email: 'khoilam.dev@gmail.com',
    score: 24,
    follower: 200,
    status: 'review'
  },
]

function Influencer({ campaign }: InfluencerProps) {
  return (
    <div className='2xl:w-[1318px] w-full'>
      <div className='p-4 border border-gray-200 rounded-lg'>
        <div className='flex items-center mb-3 justify-between'>
          <h5 className='text-gray-800 '>Influencer participants(20)</h5>
          <Button type='link'>View All</Button>
        </div>
        <div className='grid 2xl:grid-cols-4 2xl:gap-5 gap-4  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1'>
          {influencers.map(i => (
            <div className='border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer rounded-lg bg-gradient-to-b from-blue-50 to-white p-3'>
              <div className='flex items-center gap-3'>
                <div className='flex flex-col'>
                  <div className='flex items-start gap-3'>
                    <img className='w-[36px] rounded-[50%] h-[36px] object-cover' src={i.avatar} alt="avatar" />
                    <div>
                      <h6 className='text-sm text-gray-800'>{i.name}</h6>
                      <p className='text-sm text-gray-500 '>{i.email}</p>
                      <div className='w-[140px] mt-2 flex items-center justify-between'>
                        <div>
                          <p className='text-xs text-gray-500 '>Score</p>
                          <span className='text-gray-800 flex items-center gap-1'><StarIcon width={12} className='text-blue-500' />{i.score}</span>
                        </div>
                        <div>
                          <p className='text-xs text-gray-500 '>Followers</p>
                          <span className='text-gray-800'>{i.follower}l</span>
                        </div>
                      </div>
                      <div className='mt-4'>
                        {i.status === 'review'
                          ? <div className='flex items-center gap-2'>
                            <div className='bg-gray-100 w-[67px] h-[33px] flex items-center justify-center rounded-md border-none hover:bg-gray-200 transition-all'>Reject</div>
                            <div className='bg-blue-50 w-[82px] h-[33px] hover:bg-blue-100 transition-all flex items-center justify-center rounded-md hover:text-blue-500 text-blue-500' >Approve</div>
                          </div>
                          : <div style={{ backgroundColor: getColorInfluencerContent(i.status as InfluencerContentStatus)?.background }}
                            className={`inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px]`}>
                            <div style={{ backgroundColor: getColorInfluencerContent(i.status as InfluencerContentStatus)?.color }}
                              className={`w-2 h-2 rounded-[50%]`}></div>
                            <span style={{ color: getColorInfluencerContent(i.status as InfluencerContentStatus)?.color }} className='text-[12px] capitalize '>{i.status}</span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Influeencer Performane */}
      <div className='mt-5 flex items-center justify-between'>
        <div>
          <h5 className='text-gray-900 text-[24px] '>Influencer Performance</h5>
          <span className='text-sm text-gray-700'>Manage your content and vie their sales performance</span>
        </div>
        <button className='bg-[#F3F4F6] px-3 justify-between flex items-center px hover:bg-[#D1D5DB] transition-all text-sm h-[36px] w-[123px] font-semibold rounded-[8px] text-[#1F2937]'>
            All Status
            <ChevronUpDownIcon width={16} />
          </button>
      </div>
    </div>
  )
}

export default Influencer

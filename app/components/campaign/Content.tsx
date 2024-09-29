import React from 'react';

import { Button } from 'antd';
import {
  ContentStatus,
  getColorStatusContent,
} from '~/helpers/campaign.helper';
import { Campaign } from '~/models/Campaign.model';

// Todo: Implement API
const contents = [
  {
    preview:'https://images.nightcafe.studio/jobs/fGHdFkmmpfz3YiJQFf1x/fGHdFkmmpfz3YiJQFf1x--1--n2xkr.jpg?tr=w-1600,c-at_max',
    desc:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status:'approved',
    avatar:'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp',
    name:'Roneyy Evan',
    email:'khoilam.dev@gmail.com',
  },
  {
    preview:'https://appon.vn/wp-content/uploads/2022/04/content-marketing-la-gi-nhung-dang-content-marketing-pho-bien-hien-nay.jpeg',
    desc:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status:'not-review',
    avatar:'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp',
    name:'Roneyy Evan',
    email:'khoilam.dev@gmail.com'
  },
  {
    preview:'https://p16-cc-sg.tiktokcdn.com/tos-alisg-i-hdprqziq2y/0608feed4ce24db2ac386d11b5396f38~tplv-hdprqziq2y-png.png',
    desc:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status:'approved',
    avatar:'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp',
    name:'Roneyy Evan',
    email:'khoilam.dev@gmail.com'
  },
  {
    preview:'https://public.bnbstatic.com/image/cms/content/body/202306/91e6cabcd535552ba0d23b8ff24526d6.png',
    desc:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status:'rejected',
    avatar:'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp',
    name:'Roneyy Evan',
    email:'khoilam.dev@gmail.com'
  },
  {
    preview:'https://pbs.twimg.com/media/GO5isRYXkAApXla.jpg:large',
    desc:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status:'rejected',
    avatar:'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp',
    name:'Roneyy Evan',
    email:'khoilam.dev@gmail.com'
  },
  {
    preview:'https://pbs.twimg.com/media/FmVHoG9WYAMo-sZ.jpg:large',
    desc:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status:'rejected',
    avatar:'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp',
    name:'Roneyy Evan',
    email:'khoilam.dev@gmail.com'
  },
]

type ContentProps = {
  campaign: Campaign | null
}

function Content({ campaign }: ContentProps) {
  return (
    <div className='2xl:w-[1316px] w-full'>
      <h5 className='text-xl text-gray-800'>Influencer Content(20)</h5>
      <div className='mt-5 grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-5'>
       {contents.map(c => (
         <div className='rounded-2xl cursor-pointer border border-gray-200 hover:shadow-md transition-shadow'>
         <img className='2xl:h-[400px] xl:h-[280px] lg:h-[240px] rounded-t-2xl w-full object-cover' src={c.preview} alt="content preview" />
         <div className='p-4'>
           <div className='flex items-center gap-3'>
             <img className='w-[36px] rounded-[50%] h-[36px] object-cover' src={c.avatar} alt="avatar" />
             <div className='flex flex-col'>
               <h6 className='text-sm text-gray-800'>{c.name}</h6>
               <p className='text-sm text-gray-500 '>{c.email}</p>
             </div>
           </div>
           <p className='text-gray-500 mt-2 text-sm leading-5'>{c.desc}</p>
           <div className='flex items-center justify-between mt-6'>
             <div style={{ backgroundColor: getColorStatusContent(c.status as ContentStatus)?.background }}
               className={`inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px]`}>
               <div style={{ backgroundColor: getColorStatusContent(c.status as ContentStatus)?.color }}
                 className={`w-2 h-2 rounded-[50%]`}></div>
               <span style={{ color: getColorStatusContent(c.status as ContentStatus)?.color }} className='text-[12px] capitalize '>{c.status}</span>
             </div>
             <Button className='bg-gray-100' type='text' >View content</Button>
           </div>
         </div>

       </div>
       ))}

      </div>
    </div>
  )
}

export default Content

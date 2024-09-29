import React from 'react';

import CountUp from 'react-countup';
import { Campaign } from '~/models/Campaign.model';

import LineChart from '../custom/charts/LineChart';

type ReportsProps = {
  campaign: Campaign | null
}

function Reports({ campaign }: ReportsProps) {
  return (
    <div className='2xl:w-[1316px] w-full'>
    <div className='grid grid-cols-4 2xl:gap-6 gap-4'>
      <div className='border border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-lg flex items-start justify-between flex-col 2xl:h-[135px] h-[120px]'>
        <h5 className=' text-gray-800'>Conversion Rate</h5>
        <span className='text-[24px] font-bold'>
        $<CountUp end={234.423} />
        </span>
        <div className='flex items-center gap-1'>
          <span className='text-green-500 text-[12px]'>+10%</span>
          <span className='text-gray-500 text-[12px]'>vs last month</span>
        </div>
      </div>
   
      <div className='border border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-lg flex items-start justify-between flex-col 2xl:h-[135px] h-[120px]'>
        <h5 className=' text-gray-800'>Cost Per Conversion</h5>
        <span className='text-[24px] font-bold'>
        $<CountUp end={23423} />
        </span>
        <div className='flex items-center gap-1'>
          <span className='text-green-500 text-[12px]'>+30%</span>
          <span className='text-gray-500 text-[12px]'>vs last month</span>
        </div>
      </div>
       <div className='border border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-lg flex items-start justify-between flex-col 2xl:h-[135px] h-[120px]'>
        <h5 className=' text-gray-800'>Total Cost</h5>
        <span className='text-[24px] font-bold'>
        $<CountUp end={26542} />
        </span>
        <div className='flex items-center gap-1'>
          <span className='text-red-500 text-[12px]'>-25%</span>
          <span className='text-gray-500 text-[12px]'>vs last month</span>
        </div>
      </div>
       <div className='border border-gray-200 hover:shadow-md cursor-pointer transition-shadow 2xl:p-5 p-4 rounded-lg flex items-start justify-between flex-col 2xl:h-[135px] h-[120px]'>
        <h5 className=' text-gray-800'>Total Product Cost</h5>
        <span className='text-[24px] font-bold'>
        $<CountUp end={7567332} />
        </span>
        <div className='flex items-center gap-1'>
          <span className='text-green-500 text-[12px]'>+50%</span>
          <span className='text-gray-500 text-[12px]'>vs last month</span>
        </div>
      </div>
    </div>
    <div className='2xl:mt-6 mt-4 2xl:p-5 p-4 border border-gray-200 rounded-lg'>
      <h6 className='2xl:text-[24px] text-lg font-semibold text-gray-900'>Click</h6>
      <p className='text-xs text-gray-500 mt-3'>Total</p>
      <p className='2xl:text-3xl text-xl mt-2 mb-5 font-bold text-gray-900'>12,234</p>
      <LineChart/>
    </div>

    </div>
  )
}

export default Reports

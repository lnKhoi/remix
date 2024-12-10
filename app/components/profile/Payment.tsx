import React from 'react';

import { Button } from 'antd';
import PaymentCard from '~/assets/balance-card.png';
import Visa from '~/assets/visa.png';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

function Payment() {
  return (
    <div>
      <div className='p-5 border flex items-center justify-between border-gray-200 rounded-xl'>
        <div className='flex flex-col gap-1'>
          <p className='text-lg text-gray-800 font-normal'>Actual Balance</p>
          <p className='text-2xl font-semibold text-gray-800'>0.00 Token</p>
          <div className='gap-3 flex items-center'>
            <ExclamationCircleIcon className='w-5 h-5 text-gray-800' />
            <p className='text-sm font-normal text-gray-500'>Locked: $0.00</p>
          </div>
          <Button className='w-[50px] mt-3' type='primary'>Buy</Button>
        </div>
        <img src={PaymentCard} alt="balance card" />
      </div>
      <div className='border border-gray-200 py-5 mt-5 rounded-xl'>
        <div className='flex items-center justify-between px-5 pb-5 border-b border-b-gray-200'>
          <p className='text-lg font-semibold text-gray-800'>Payment Methods</p>
          <Button type='primary'>Add New</Button>
        </div>
      <div className='mt-5 px-5 py-4 rounded-xl mx-8 border border-dashed'>
     <div className='flex items-center gap-3'>
     <img src={Visa} alt="visa" />
     <div className='flex flex-col'></div>
     </div>
      </div>
      </div>
    </div>
  )
}

export default Payment

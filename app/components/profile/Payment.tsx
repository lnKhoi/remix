import React from 'react';

import { Button } from 'antd';
import PaymentCard from '~/assets/balance-card.png';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

function Payment() {
  return (
    <div>
      <div className='p-5 border flex items-center justify-between border-gray-200 rounded-xl'>
        <div className='flex flex-col gap-1'>
            <p className='text-lg text-gray-800 font-normal'>Actual Balance</p>
            <p className='text-2xl font-semibold text-gray-800'>0.00 Token</p>
            <div className='gap-3 flex items-center'>
                <ExclamationCircleIcon className='w-5 h-5 text-gray-800'/>
                <p className='text-sm font-normal text-gray-500'>Locked: $0.00</p>
            </div>
            <Button className='w-[50px] mt-3' type='primary'>Buy</Button>
        </div>
        <img src={PaymentCard} alt="balance card" />
      </div>
      <div className='border border-gray-200 p-5 mt-5 rounded-xl'></div>
    </div>
  )
}

export default Payment

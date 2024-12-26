import React from 'react';

import { Table } from 'antd';
import { InputSearch } from '~/components/ui/input-search';
import { FinanceColumns } from '~/constants/finance.constant';

import { useNavigate } from '@remix-run/react';

function Finance() {
    const navigate = useNavigate()
    return (
        <div>
            <div>
                <h2 className='text-2xl font-medium text-gray-800'>Finance</h2>
            </div>

            <div className='mt-6 border border-gray-200 grid grid-cols-3 rounded-xl p-6'>
                <div className='flex flex-col'>
                    <p className='text-xs font-medium text-gray-800'>Members</p>
                    <span className='text-lg font-bold text-gray-800 mt-3'>56</span>
                </div>
                <div className='flex flex-col'>
                    <p className='text-xs font-medium text-gray-800'>Payment Amount</p>
                    <span className='text-lg font-bold text-gray-800 mt-3'>23,434.11 Tokens</span>
                </div>
                <div className='flex flex-col'>
                    <p className='text-xs font-medium text-gray-800'>Amount Paid</p>
                    <span className='text-lg font-bold text-gray-800 mt-3'>1,434.03 Tokens</span>
                </div>
            </div>

            <div className='mt-6 flex items-center gap-3'>
                <p className='font-medium text-base text-gray-800'>10 Campaigns</p>
                <InputSearch onChange={(e) => null} placeholder='Search campaigns' className='w-[300px] h-[36px] ' />
            </div>

            <div className='mt-6 cursor-pointer'>
                <Table
                    columns={FinanceColumns(false) as any}
                    dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                />
            </div>
        </div>
    )
}

export default Finance

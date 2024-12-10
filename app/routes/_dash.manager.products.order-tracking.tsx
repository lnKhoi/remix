import React from 'react';

import { Table } from 'antd';
import { InputSearch } from '~/components/ui/input-search';
import { productColumn } from '~/constants/product.constant';

import {
  AdjustmentsHorizontalIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';

function OrderTracking() {

    const handleSearchProducts = (e: string) => {
    }

    const influencers = [
        {
            key: "1",
        },
        {
            key: "2",
        },
        {
            key: "3",
        },
        {
            key: "3",
        },
        {
            key: "3",
        },
        {
            key: "3",
        },

    ];
    return (
        <div>
            <div className='flex mb-5 items-end justify-between'>
                <InputSearch onChange={(e) => handleSearchProducts(e.target.value)} placeholder='Influencer, product, or campaign' className='w-[300px] h-[36px] ' />
                <div className='flex items-center gap-3'>
                    <button className='bg-gray-100 px-3 justify-between flex items-center px hover:bg-gray-300 transition-all text-sm h-[36px] w-[105px] font-normal rounded-[9px] text-gray-800'>
                        All Status
                        <ChevronUpDownIcon width={16} />
                    </button>
                    <button className=' bg-gray-100 hover:bg-gray-300 transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[87px] font-normal rounded-[9px] text-gray-800'>
                        <AdjustmentsHorizontalIcon width={16} />  Filter
                    </button>
                </div>
            </div>

            {/* List Products */}
            <Table
                columns={productColumn}
                dataSource={influencers}
            />
        </div>
    )
}

export default OrderTracking

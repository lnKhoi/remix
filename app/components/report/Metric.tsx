import React, { memo } from 'react';

import {
  Skeleton,
  Tooltip,
} from 'antd';
import CountUp from 'react-countup';

import { InformationCircleIcon } from '@heroicons/react/24/outline';

type MetricProps = {
    loading: boolean
    data: number
    title: string
    unit: '%' | '$' | ''
    desc?: string
}

function Metric({ loading, data, title, unit, desc }: MetricProps) {

    return (
        <div className='border relative justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow p-4 rounded-xl flex items-start flex-col h-[86px]'>
            <h5 className=' text-gray-800 text-xs mb-1'>{title}</h5>
            {loading
                ? <Skeleton.Button active block />
                : <span className='text-2xl font-bold'>
                    {unit == '$' && '$'}<CountUp decimals={2} end={data || 0} />{unit == '%' && '%'}
                </span>
            }
            <Tooltip title={desc}>
                <InformationCircleIcon className='w-5 cursor-pointer absolute right-2 top-2 h-5 text-gray-600' />
            </Tooltip>
        </div>
    )
}

export default memo(Metric)

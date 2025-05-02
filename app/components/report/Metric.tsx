import React, { memo } from 'react';

import { Skeleton } from 'antd';
import CountUp from 'react-countup';

type MetricProps = {
    loading: boolean
    data: number
    title: string
    unit: '%' | '$' | ''
}

function Metric({ loading, data, title, unit }: MetricProps) {

    return (
        <div className='border justify-around border-gray-200 hover:shadow-md cursor-pointer transition-shadow p-4 rounded-xl flex items-start flex-col h-[86px]'>
            <h5 className=' text-gray-800 text-xs mb-1'>{title}</h5>
            {loading
                ? <Skeleton.Button active block />
                : <span className='text-2xl font-bold'>
                    {unit == '$' && '$'}<CountUp decimals={2} end={data || 0} />{unit == '%' && '%'}
                </span>
            }
        </div>
    )
}

export default memo(Metric)

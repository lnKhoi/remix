import { TableColumnsType } from 'antd';
import DefaultAvatar from '~/assets/avatar.jpeg';
import TagColor from '~/components/ui/tagColor';
import { Finance } from '~/models/finance.model';

import { Link } from '@remix-run/react';

export const FinanceColumns = (loading: boolean): TableColumnsType<Finance> => [
    {
        title: 'Campaign',
        render: (_, record) => (
            <Link to={`/manager/1`}>
                <p className="text-sm font-medium text-blue-500">Campaign name 001</p>
            </Link>
        ),
    },
    {
        title: 'Members',
        render: (_, record) => (
            <span className="text-sm text-gray-800 font-normal">4</span>
        ),
    },
    {
        title: 'Payment Amount',
        render: (_, record) =>
            <>
                <span className="text-sm text-gray-800 font-normal">1233.4 Tokens</span>
            </>
    },
    {
        title: 'Amount Paid',
        render: (_, record) =>
            <>
                <span className="text-sm text-gray-800 font-normal">$24.44 Tokens</span>
            </>
    },
    {
        title: 'Action',
        render: (_, record) =>
            <Link to={`/manager/finance-details/5`}>
                <p className="text-sm text-blue-500 font-normal">View Details</p>
            </Link>
    },
];


export const FinanceDetailsColumns = (loading: boolean): TableColumnsType<Finance> => [
    {
        title: 'Name',
        render: (_, record) => (
            <div className='flex items-start gap-3'>
                <img src={DefaultAvatar} alt="avatar" className='w-[36px] h-[36px] rounded-[50%]' />
                <div className='flex flex-col'>
                    <p className='text-sm font-medium text-gray-800'>Levi's</p>
                    <span className='text-sm font-normal text-gray-500'>khoilam.dev@gmail.com</span>
                </div>

            </div>
        ),
    },
    {
        title: 'Amount Paid',
        render: (_, record) =>
            <>
                <span className="text-sm text-gray-800 font-normal">$24.44 Tokens</span>
            </>
    },
    {
        title: 'Payment Date',
        render: (_, record) =>
            <>
                <span className="text-sm text-gray-800 font-normal">14/01/2025</span>
            </>
    },
    {
        title: 'Status',
        render: (_, record) =>
            <>
                <TagColor status='pending' color='#A16207' background='#FFEDD5' />
            </>
    },
];

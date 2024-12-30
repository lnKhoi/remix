import React, {
  useEffect,
  useState,
} from 'react';

import {
  Breadcrumb,
  Skeleton,
  Table,
} from 'antd';
import {
  getCampaignMetrics,
  getMembersInFinance,
} from '~/apis/finance';
import { InputSearch } from '~/components/ui/input-search';
import { FinanceDetailsColumns } from '~/constants/finance.constant';
import {
  FinanceMetrics,
  MemberInCampaign,
} from '~/models/finance.model';

import {
  Link,
  useNavigate,
  useParams,
} from '@remix-run/react';

function FinanceDetails() {
  const navigate = useNavigate()
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false)
  const [campaignMetrics, setCampaignMetric] = useState<FinanceMetrics | null>(null)
  const [membersInFinance, setMembersInFinance] = useState<{ total: number, data: MemberInCampaign[] }>({ total: 0, data: [] })

  const getFinanceDetails = () => {
    setLoading(true)
    Promise.all([getCampaignMetrics(id as string), getMembersInFinance(id as string)])
      .then(([metrics, members]) => {
        setCampaignMetric(metrics?.data)
        setMembersInFinance({ total: members?.data?.total, data: members?.data?.data })
      })
      .catch(error => { console.error('Error fetching data:', error) })
      .finally(() => setLoading(false))
  };

  useEffect(() => { getFinanceDetails() }, [])

  return (
    <div>
      <Breadcrumb
        className='fixed h-[40px] w-full '
        items={[
          { title: <Link to={'/manager/finance'}>Finance</Link>, },
          { title: <p className='text-gray-800'>{campaignMetrics?.campaignName}</p> },
        ]}
      />

      <div className='mt-8'>
        <div>
          <h2 className='text-2xl font-medium text-gray-800'>{campaignMetrics?.campaignName}</h2>
        </div>

        <div className='mt-6 border border-gray-200 grid grid-cols-3 rounded-xl p-6'>
          <div className='flex flex-col'>
            <p className='text-xs font-medium text-gray-800'>Member</p>
            <span className='text-lg font-bold text-gray-800 mt-3'>
              {loading ? <Skeleton.Input active size='small' /> : campaignMetrics?.totalMembers}
            </span>
          </div>
          <div className='flex flex-col'>
            <p className='text-xs font-medium text-gray-800'>Payment AMount</p>
            <span className='text-lg font-bold text-gray-800 mt-3'>
              {loading ? <Skeleton.Input active size='small' /> : campaignMetrics?.totalPayment.toFixed(2) + ' Tokens'}
            </span>
          </div>
          <div className='flex flex-col'>
            <p className='text-xs font-medium text-gray-800'>Amount Paid</p>
            <span className='text-lg font-bold text-gray-800 mt-3'>
              {loading ? <Skeleton.Input active size='small' /> : campaignMetrics?.totalPaid.toFixed(2) + ' Tokens'}
            </span>
          </div>
        </div>

        <div className='mt-6 flex items-center gap-3'>
          <p className='font-medium text-base text-gray-800'>{membersInFinance.total} Members</p>
          <InputSearch onChange={(e) => null} placeholder='Search...' className='w-[300px] h-[36px] ' />
        </div>

        <div className='mt-6 cursor-pointer'>
          <Table
            columns={FinanceDetailsColumns(loading) as any}
            dataSource={loading ? Array.from({ length: 10 }, () => ({})) : membersInFinance.data}
          />
        </div>
      </div>
    </div>
  )
}

export default FinanceDetails

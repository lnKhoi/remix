import React, {
  useEffect,
  useState,
} from 'react';

import {
  Breadcrumb,
  Skeleton,
  Table,
} from 'antd';
import dayjs from 'dayjs';
import {
  getCampaignMetrics,
  getMembersInFinance,
} from '~/apis/finance';
import { InputSearch } from '~/components/ui/input-search';
import ModalSelectTimeRange, {
  DateRange,
} from '~/components/ui/ModalSelectTimeRange';
import { FinanceDetailsColumns } from '~/constants/finance.constant';
import { DATE_TIME_FORMAT_V4 } from '~/constants/time.constant';
import { useAuthContext } from '~/contexts/auth.context';
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
  const {userInfo} = useAuthContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [campaignMetrics, setCampaignMetric] = useState<FinanceMetrics | null>(null)
  const [membersInFinance, setMembersInFinance] = useState<{ total: number, data: MemberInCampaign[] }>({ total: 0, data: [] })

  const getFinanceDetails = (time:string,dates:DateRange) => {
    if (time !== 'custom' || (dates?.[0] && time === 'custom')) { 
      setLoading(true)
      Promise.all([getCampaignMetrics(id as string,time,dates), getMembersInFinance(id as string,time,dates)])
      .then(([metrics, members]) => {
        setCampaignMetric(metrics?.data)
        setMembersInFinance({ total: members?.data?.total, data: members?.data?.data })
      })
      .catch(error => { console.error('Error fetching data:', error) })
      .finally(() => setLoading(false))
    }
  };

  useEffect(() => { getFinanceDetails('',null) }, [])

  return (
    <div>
      <Breadcrumb
        className='fixed h-[40px] w-full '
        items={[
          { title: <Link to={'/manager/finance'}>Finance</Link>, },
          { title: <p className='text-gray-800'>{campaignMetrics?.campaignName}</p> },
        ]}
      />

      <div className='mt-10'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-medium text-gray-800'>{campaignMetrics?.campaignName}</h2>
          <ModalSelectTimeRange
                    allTime={`All Time ${dayjs(userInfo?.created_at).format(DATE_TIME_FORMAT_V4)} - Today`}
                    onSelect={(time, dates) => getFinanceDetails(time, dates)}
                />
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

import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';

import {
  Breadcrumb,
  Skeleton,
  Table,
} from 'antd';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
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
  useParams,
} from '@remix-run/react';

function FinanceDetails() {
  const { id } = useParams();
  const { userInfo } = useAuthContext()

  const [search,setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingMetrics, setLoadingMetrics] = useState<boolean>(false)
  const [campaignMetrics, setCampaignMetric] = useState<FinanceMetrics | null>(null)
  const [membersInFinance, setMembersInFinance]
    = useState<{ total: number, data: MemberInCampaign[] }>({ total: 0, data: [] })

  const getFinanceDetails = (time: string, dates: DateRange) => {
    if (time !== 'custom' || (dates?.[0] && time === 'custom')) {
      setLoading(true)
      getMembersInFinance(id as string, time, dates,search)
        .then(res => setMembersInFinance({ total: res?.data?.total, data: res?.data?.data }))
        .finally(() => setLoading(false))
    }
  };

  const getFinanceMetrics = () => {
    setLoadingMetrics(true)
    getCampaignMetrics(id as string).then(res => setCampaignMetric(res?.data))
      .finally(() => setLoadingMetrics(false))
  }

  const handleSearchCampaigns = debounce((e: ChangeEvent<HTMLInputElement>): void =>
     {setSearch(e.target.value);}, 500);

  useEffect(() => getFinanceMetrics(), [])
  useEffect(() => { getFinanceDetails('', null) }, [search])

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
        </div>

        <div className='mt-6 border border-gray-200 grid grid-cols-3 rounded-xl p-6'>
          <div className='flex flex-col'>
            <p className='text-xs font-medium text-gray-800'>Payment Recepient</p>
            <span className='text-lg font-bold text-gray-800 mt-3'>
              {loadingMetrics ? <Skeleton.Input active size='small' /> : campaignMetrics?.totalMembers}
            </span>
          </div>
          <div className='flex flex-col'>
            <p className='text-xs font-medium text-gray-800'>Payment AMount</p>
            <span className='text-lg font-bold text-gray-800 mt-3'>
              {loadingMetrics ? <Skeleton.Input active size='small' /> : campaignMetrics?.totalPayment.toFixed(2) + ' Tokens'}
            </span>
          </div>
          <div className='flex flex-col'>
            <p className='text-xs font-medium text-gray-800'>Amount Paid</p>
            <span className='text-lg font-bold text-gray-800 mt-3'>
              {loadingMetrics ? <Skeleton.Input active size='small' /> : campaignMetrics?.totalPaid.toFixed(2) + ' Tokens'}
            </span>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <p className='font-medium text-base text-gray-800'>{membersInFinance.total} Members</p>
            <InputSearch   onChange={(e) => handleSearchCampaigns(e)} placeholder='Search...' className='w-[300px] h-[36px] ' />
          </div>
          <ModalSelectTimeRange
            allTime={`All Time ${dayjs(userInfo?.created_at).format(DATE_TIME_FORMAT_V4)} - Today`}
            onSelect={(time, dates) => getFinanceDetails(time, dates)}
          />
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

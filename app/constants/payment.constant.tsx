import {
  Skeleton,
  TableColumnsType,
} from 'antd';
import dayjs from 'dayjs';
import { Payment } from '~/models/payment.model';

import { DATE_TIME_FORMAT_V2 } from './time.constant';

export const paymentHistoryColumns = (loading: boolean): TableColumnsType<Payment> => [
  {
    title: 'Time',
    render: (_, record) =>
      loading ? (
        <Skeleton.Input style={{ width: 100 }} active size="small" />
      ) : (
        <p>{dayjs(record?.created_at).format(DATE_TIME_FORMAT_V2)}</p>
      ),
  },
  {
    title: 'Type',
    render: (_, record) =>
      loading ? (
        <Skeleton.Input style={{ width: 80 }} active size="small" />
      ) : (
        <p>{record.type}</p>
      ),
  },
  {
    title: 'Amount',
    render: (_, record) =>
      loading ? (
        <Skeleton.Input style={{ width: 60 }} active size="small" />
      ) : (
        <p>${record.amount.toFixed(2)}</p>
      ),
  },
  {
    title: 'Transaction ID',
    render: (_, record) =>
      loading ? (
        <Skeleton.Input style={{ width: 150 }} active size="small" />
      ) : (
        <p>{record.invoice_id}</p>
      ),
  },
  {
    title: 'Status',
    render: (_, record) =>
      loading ? (
        <Skeleton.Input style={{ width: 150 }} active size="small" />
      ) : (
        <p className='text-green-600 capitalize'>{record.status}</p>
      ),
  },
  {
    title: 'Payment Method',
    render: (_, record) =>
      loading ? (
        <Skeleton.Input style={{ width: 150 }} active size="small" />
      ) : (
        <p>{record.brand}</p>
      ),
  },
];
export const initialCardDetails = {
  number: "",
  name: "",
  expiry: "",
  cvc: "",
  focus: "",
}
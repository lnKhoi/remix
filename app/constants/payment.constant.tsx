import { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { TransactionHistory } from '~/models/payment.model';

import { DATE_TIME_FORMAT_V2 } from './time.constant';

export const paymentHistoryColumns:TableColumnsType<TransactionHistory>  = [
  {
    title: 'Time',
    render: (_,record) => <p>{dayjs(record?.time).format(DATE_TIME_FORMAT_V2)}</p>
  },
  {
    title: 'Type',
    render: (_,record) => <p>{record.type}</p>
  },
  {
    title: 'Amount',
    render: (_,record) => <p>${record.amount.toFixed(2)}</p>
  },
  {
    title: 'Transaction ID',
    render: () => <p>343434</p>
  },
];

export const initialCardDetails = {
  number: "",
  name: "",
  expiry: "",
  cvc: "",
  focus: "",
}
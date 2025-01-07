import {
  Skeleton,
  TableColumnsType,
} from 'antd';
import dayjs from 'dayjs';
import AmericanExpress from '~/assets/american-express.webp';
import Discover from '~/assets/discover.png';
import MasterCard from '~/assets/mastercard.jpg';
import Visa from '~/assets/visa.png';
import { Payment } from '~/models/payment.model';

import { DATE_TIME_FORMAT_V2 } from './time.constant';

export const paymentHistoryColumns = (
  loading: boolean,
  handleDownload: (record: Payment) => void
): TableColumnsType<Payment> => [
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
          <p className="text-green-600 capitalize">Success</p>
        ),
    },
    {
      title: 'Payment Method',
      render: (_, record) =>
        loading ? (
          <Skeleton.Input style={{ width: 150 }} active size="small" />
        ) : (
          <div className='flex items-center gap-1'>
            <span className='capitalize'>{record.brand}</span>
            <p> ....{record?.bank_last4}</p>
          </div>
        ),
    },
    {
      title: 'Action',
      render: (_, record) =>
        loading ? (
          <Skeleton.Input style={{ width: 150 }} active size="small" />
        ) : (
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => handleDownload(record)}
          >
            Download Invoice
          </p>
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

export const paymentMethodBrandLogo = {
  visa: Visa,
  mastercard: MasterCard,
  amex: AmericanExpress,
  discover:Discover
};

export const availableTokensDesc = 'Tokens the brand can use immediately for transactions or withdrawals'
export const lockedTokensDesc = 'Tokens temporarily held for active campaigns to ensure funds are reserved for payments or expenses.'
export const totalBalanceDesc = "The sum of available and locked tokens in the brand's account."
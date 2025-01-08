import React, {
  useEffect,
  useState,
} from 'react';

import { Table } from 'antd';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import {
  downloadInvoice,
  getPaymentsHistory,
} from '~/apis/stripe';
import { paymentHistoryColumns } from '~/constants/payment.constant';
import { Payment } from '~/models/payment.model';

type PaymentHistoryProps = {
    loading: boolean;
    paymentHistory: Payment[];
};

function PaymentHistory() {
    const [loading, setLoading] = useState<boolean>(false)
    const [params,setParams] = useState<{page:number,perPage:number}>({page:1,perPage:10})
    const [paymentHistory, setPaymentHistory] = useState<{ total: number, data: Payment[] }>({ total: 0, data: [] })

    const handleGetPaymentHistory = () => {
        setLoading(true)
        getPaymentsHistory(params.page,params.perPage).then(res => setPaymentHistory({ total: res.data.total, data: res?.data?.data }))
            .finally(() => setLoading(false))
    }

    const handleDownloadInvoice = (record: Payment) => {
        downloadInvoice(record.invoice_id)
            .then(res => {
                window.open(res.data.invoicePdfUrl, "_blank")
            })
            .catch(err => toast.error(err?.message))
    };

    useEffect(() => handleGetPaymentHistory(), [params])

    return (
        <div>
            <ToastContainer />
            <Table
                columns={paymentHistoryColumns(loading, handleDownloadInvoice)}
                dataSource={loading ? Array(10).fill({}) : paymentHistory.data}
                rowKey="id"
                onChange={(e ) => setParams({...params,page:e.current as number})}
                pagination={{
                    total: paymentHistory.total,
                    pageSize: 10, 
                    showSizeChanger: false, 
                    defaultCurrent: 1, 
                }}
            />
        </div>
    );
}

export default PaymentHistory;

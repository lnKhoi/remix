import React from 'react';

import { Table } from 'antd';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import { downloadInvoice } from '~/apis/stripe';
import { paymentHistoryColumns } from '~/constants/payment.constant';
import { Payment } from '~/models/payment.model';

type PaymentHistoryProps = {
    loading: boolean;
    paymentHistory: Payment[];
};

function PaymentHistory({ loading, paymentHistory }: PaymentHistoryProps) {

    const handleDownloadInvoice = (record: Payment) => {
        downloadInvoice(record.invoice_id)
            .then(res => {
                window.open(res.data.invoicePdfUrl, "_blank")
            })
            .catch(err => toast.error(err?.message))
    };

    return (
        <div>
            <ToastContainer />
            <Table
                columns={paymentHistoryColumns(loading, handleDownloadInvoice)}
                dataSource={loading ? Array(5).fill({}) : paymentHistory}
                rowKey="id"
                loading={false}
            />
        </div>
    );
}

export default PaymentHistory;

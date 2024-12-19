import React from 'react';

import { Table } from 'antd';
import { paymentHistoryColumns } from '~/constants/payment.constant';
import { Payment } from '~/models/payment.model';

type PaymentHistoryProps = {
    loading: boolean
    paymentHistory: Payment[]
}
function PaymentHistory({ loading, paymentHistory }: PaymentHistoryProps) {

    return (
        <div>
            <Table
                columns={paymentHistoryColumns(loading)}
                dataSource={loading ? Array(5).fill({}) : paymentHistory} 
                rowKey="id" 
                loading={false} 
            />
        </div>
    )
}

export default PaymentHistory

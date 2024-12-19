import React, {
  useEffect,
  useState,
} from 'react';

import { Table } from 'antd';
import { getPaymentsHistory } from '~/apis/stripe';
import { paymentHistoryColumns } from '~/constants/payment.constant';

function PaymentHistory() {
    const [loading,setLoading] = useState<boolean>(false)
    const [paymentHistory,setPaymentHistory] = useState([])

    const handleGetPaymentsHistory = () => {
        getPaymentsHistory().then(res => console.log(res))
    }

    useEffect(() => {
        handleGetPaymentsHistory()
    }, []); 
    
    return (
        <div>
            <Table
                columns={paymentHistoryColumns}
                dataSource={paymentHistory}
            />
        </div>
    )
}

export default PaymentHistory

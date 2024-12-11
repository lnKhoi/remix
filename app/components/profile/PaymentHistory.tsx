import React, {
  useEffect,
  useState,
} from 'react';

import { Table } from 'antd';
import { paymentHistoryColumns } from '~/constants/payment.constant';

function PaymentHistory() {
    const [paymentHistory,setPaymentHistory] = useState([])

    useEffect(() => {
        const storedPaymentHistory = localStorage.getItem('paymentHistory');
        setPaymentHistory(JSON.parse(storedPaymentHistory || '[]'));
    }, [localStorage.getItem('paymentHistory')]); 
    
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

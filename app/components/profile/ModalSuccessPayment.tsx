import React from 'react';

import {
  Button,
  Modal,
} from 'antd';
import dayjs from 'dayjs';
import Success from '~/assets/success.png';
import { DATE_TIME_FORMAT_V2 } from '~/constants/time.constant';

type ModalSuccessPayment = {
    open: boolean
    onClose: () => void
    totalToken: number
    newToken: number
    onChangeTotalToken: (total: number) => void
}

function ModalSuccessPayment({ onClose, open, newToken, totalToken, onChangeTotalToken }: ModalSuccessPayment) {

    const handleOk = () => {
        onChangeTotalToken(totalToken + newToken)
        onClose()

        const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
        const newPayment = {
            time: dayjs().format(DATE_TIME_FORMAT_V2),
            type: 'top-up',
            amount: newToken,
        };
        paymentHistory.push(newPayment);
        localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    }

    return (
        <Modal
            footer={null}
            width={356}
            open={open}
            onClose={onClose}>
            <div className='flex flex-col items-center'>
                <img src={Success} />
                <p className='text-xl mt-5 font-semibold'>Successfull Payment!</p>
                <span className='text-sm mt-[5px] text-gray-500 font-normal text-center '>Your transaction was completed successfully. <br /> Thank you for your purcharse</span>
                <p className='mt-5 text-sm font-normal text-gray-500'>Actual Balance</p>
                <span className='mt-[6px] text-xl font-semibold  text-gray-800'>{newToken} Tokens</span>
                <Button onClick={handleOk} type='primary' className='mt-8 w-full' >OK</Button>
            </div>
        </Modal>
    )
}

export default ModalSuccessPayment
import React, { useState } from 'react';

import {
  Button,
  Drawer,
  InputNumber,
  Radio,
} from 'antd';
import Balance from '~/assets/balance.png';
import { paymentMethodBrandLogo } from '~/constants/payment.constant';
import { CreditCard } from '~/models/payment.model';

import ConfirmWithdrawToken from './ConfirmWithdrawToken';

type WithdrawTokenProps = {
    cards: CreditCard[]
    open: boolean
    onclose: () => void
    balance: number
    onPayment: (total: number) => void
}

function WithdrawToken({ cards, onclose, open, onPayment, balance }: WithdrawTokenProps) {
    const [totalTokens, setTotalTokens] = useState<number>(0)
    const cardPrimary = cards?.[0]
    const [loading, setLoading] = useState<boolean>(false)
    const [confirmWithdrawToken, setConfirmWithdrawToken] = useState<boolean>(false)

    const handleWithdrawToken = () => {
       
    }

    return (
        <>
            <Drawer
                title='Withdraw Token'
                width={650}
                open={open}
                onClose={() => onclose()}
                footer={
                    <div className='flex items-center gap-2 justify-end'>
                        <Button onClick={() => onclose()}>Cancel</Button>
                        <Button
                            loading={loading} onClick={() => setConfirmWithdrawToken(true)}
                            disabled={totalTokens === 0} type='primary'>Withdraw</Button>
                    </div>
                }
            >

                <div>
                    <div className='border border-gray-200 rounded-xl p-5'>
                        <div className='flex items-center justify-between'>
                            <p className='text-lg font-semibold text-gray-800'>Withdraw from</p>
                            <p className='text-xs font-medium text-gray-500'>Exchange Rage: 1USD = 1 Token</p>
                        </div>

                        <div className='mt-5 border border-gray-200 flex gap-4 items-center rounded-xl p-4'>
                            <img src={Balance} alt="balance icon" />
                            <div className='flex items-start flex-col gap-[2px]'>
                                <p className='text-sm font-medium text-gray-800'>Wallet</p>
                                <span className='text-gray-500 text-xs font-normal'>Actual Balance: {balance.toFixed(2)} Tokens</span>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <p className='text-sm text-gray-800 font-medium'>Amount</p>
                            <InputNumber
                                min={50}
                                step={0.01}
                                precision={2}
                                max={50000}
                                onChange={(num) => setTotalTokens(Number(num))}
                                className='mt-1 w-full bg-gray-100 border-none h-[44px]' suffix='Token' />
                        </div>
                        <div className='flex items-end  flex-col justify-end'>
                            <div className='flex items-center mt-2 justify-end gap-2'>
                                <span className='font-bold text-gray-800 text-base'>Total:</span>
                                <p className='font-bold text-gray-800 text-base'>{totalTokens.toFixed(2)} $</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8 flex flex-col gap-5'>
                        <p className='font-semibold text-lg text-gray-800'>Payment Method</p>
                        {cards?.slice(0, 1)?.map(card => (
                            <div className='py-4 rounded-xl border-blue-600 flex items-center justify-between px-4 border bg-blue-100'>
                                <div className='flex items-center gap-3'>
                                    <img src={paymentMethodBrandLogo[card.brand as keyof typeof paymentMethodBrandLogo]} alt="Payment Card" />
                                    <div className='flex flex-col'>
                                        <p className='text-sm font-medium text-gray-800'>****{card.last4}</p>
                                        <span className='text-xs font-normal mt-[2px] text-gray-500'>Card expires at {card?.exp_year}</span>
                                    </div>
                                </div>
                                <Radio checked />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONFIRM BUY TOKEN */}
                <ConfirmWithdrawToken
                    paymentMethod={cards[0].brand}
                    total={totalTokens}
                    onConfirm={handleWithdrawToken}
                    open={confirmWithdrawToken}
                    onclose={() => setConfirmWithdrawToken(false)}
                />
            </Drawer>
        </>
    )
}

export default WithdrawToken

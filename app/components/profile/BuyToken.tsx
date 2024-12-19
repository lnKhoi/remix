import React, { useState } from 'react';

import {
  Button,
  Drawer,
  InputNumber,
  Radio,
} from 'antd';
import dayjs from 'dayjs';
import Balance from '~/assets/balance.png';
import Visa from '~/assets/visa.png';
import { CreditCard } from '~/models/payment.model';

type BuyTokenProps = {
    cards: CreditCard[]
    open: boolean
    onclose: () => void
    onPayment: (total:number) => void
}

function BuyToken({ cards, onclose, open,onPayment }: BuyTokenProps) {
    const [totalTokens, setTotalTokens] = useState<number>(0)

    const handleTopup = () => {
        onPayment(totalTokens)
        onclose()
    }

    return (
        <Drawer
            title='Buy Token'
            width={650}
            open={open}
            onClose={() => onclose()}
            footer={
                <div className='flex items-center gap-2 justify-end'>
                    <Button onClick={() => onclose()}>Cancel</Button>
                    <Button onClick={handleTopup} disabled={totalTokens === 0} type='primary'>Top Up</Button>
                </div>
            }
        >
            <div>
                <div className='border border-gray-200 rounded-xl p-5'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-semibold text-gray-800'>Top-up To</p>
                        <p className='text-xs font-medium text-gray-500'>Exchange Rage: 1USD = 1 Token</p>
                    </div>

                    <div className='mt-5 border border-gray-200 flex gap-4 items-center rounded-xl p-4'>
                        <img src={Balance} alt="balance icon" />
                        <div className='flex items-start flex-col gap-[2px]'>
                            <p className='text-sm font-medium text-gray-800'>Wallet</p>
                            <span className='text-gray-500 text-xs font-normal'>Actual Balance: 0.00 Tokens</span>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <p className='text-sm text-gray-800 font-medium'>Top-up Amount</p>
                        <InputNumber
                            onChange={(num) => setTotalTokens(Number(num))}
                            className='mt-1 w-full bg-gray-100 border-none h-[44px]' prefix='$' suffix='USD' />
                    </div>

                    <div className='flex mt-5 items-center justify-end gap-2'>
                        <span className='font-medium text-gray-800'>Total:</span>
                        <p className='font-semibold text-gray-800'>{totalTokens} Tokens</p>
                    </div>

                </div>
                <div className='mt-8 flex flex-col gap-5'>
                    <p className='font-semibold text-lg text-gray-800'>Payment Method</p>
                    {cards?.slice(0, 1)?.map(card => (
                        <div className='py-4 rounded-xl border-blue-600 flex items-center justify-between px-4 border bg-blue-100'>
                            <div className='flex items-center gap-3'>
                                <img src={Visa} alt="visa" />
                                <div className='flex flex-col'>
                                    <p className='text-sm font-medium text-gray-800'>{card?.nameOnCard}</p>
                                    <span className='text-xs font-normal mt-[2px] text-gray-500'>Card expires at {dayjs(card.created_at).format('MM-YYYY')}</span>
                                </div>
                            </div>
                            <Radio checked />
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    )
}

export default BuyToken

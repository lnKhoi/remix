import React, {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Modal,
  Skeleton,
} from 'antd';
import { getTotalTokens } from '~/apis/stripe';
import Balance from '~/assets/balance.png';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

type ModalConfirmTokenProps = {
    open: boolean,
    onConfirm: () => void
    onclose: () => void
    perInfluencerBudget: number,
    maximumParticipants: number
}
function ModalConfirmToken({ onclose, open, maximumParticipants, perInfluencerBudget, onConfirm }: ModalConfirmTokenProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [totalBalance, setTotalBalance] = useState<number>(0)

    const totalInfluencerBudget = maximumParticipants * perInfluencerBudget
    const totalCommissionFee = totalInfluencerBudget * 0.15
    const totalBudget = totalCommissionFee + totalInfluencerBudget

    const notEnoughTokens: boolean = totalBalance < totalBudget

    const handleGetTotalBalance = () => {
        setLoading(true)
        getTotalTokens()
            .then(res => setTotalBalance(res?.data?.wallet?.balance))
            .finally(() => setLoading(false))
    }

    const handleViewPaymentSettings = () => {
        onclose()
        localStorage.setItem('profile-tab','Billing')
        window.open("/manager/my-profile", "_blank")
    }

    const handleConfirmToken = () => {
        onclose()
        onConfirm()
    }

    useEffect(() => { handleGetTotalBalance() }, [])

    return (
        <Modal
            open={open}
            onCancel={onclose}
            width={650}
            footer={
                <div className='flex items-center gap-2 justify-end'>
                    <Button onClick={onclose}>Cancel</Button>
                    <Button onClick={handleConfirmToken} disabled={loading || notEnoughTokens} type='primary' >Confirm</Button>
                </div>
            }
            title={<div className='text-2xl font-semibold text-gray-800 text-center'>Notification</div>}
        >
            <div className='mt-8 flex items-center gap-3 p-4 rounded-xl border border-dashed'>
                <div className='flex items-center justify-center h-[40px] w-[40px] bg-gray-100'>
                    <img src={Balance} alt="balance" />
                </div>
                <div className='flex items-start gap-[2px] flex-col'>
                    <p className='text-sm font-medium text-gray-800'>Wallet</p>
                    {loading
                        ? <Skeleton.Input active size='small' />
                        : <span className='text-gray-500 text-xs font-normal'>Available Balance: {totalBalance} Tokens</span>}

                </div>
            </div>

            {(notEnoughTokens && !loading) && (
                <div className='mt-4 p-4 rounded-lg bg-blue-100 flex items-center gap-3'>
                    <ExclamationCircleIcon className='text-blue-500 ml-1 cursor-pointer w-5 h-5' />
                    <div className='flex flex-col'>
                        <p className='text-sm font-medium text-gray-600'>Please add funds to your account to active the campaign</p>
                        <span onClick={handleViewPaymentSettings} className='text-sm cursor-pointer font-medium text-blue-500'>Go to Payment Settings</span>
                    </div>
                </div>
            )}

            <div className='flex flex-col gap-2 mt-6 pt-7 border-t border-t-gray-100'>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-800'>Influencer Budget</span>
                    <span className='font-medium text-sm text-gray-800'>${(totalInfluencerBudget || 0)?.toFixed(2)}</span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-800'>Maximum Participants</span>
                    <span className='font-medium text-sm text-gray-800'>{maximumParticipants}</span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-800'>Per-Influencer Budget</span>
                    <span className='font-medium text-sm text-gray-800'>${perInfluencerBudget?.toFixed(2) || '0.00'}</span>
                </div>
                <div className='flex items-center justify-between pt-3 mt-2 border-t border-t-gray-200'>
                    <span className='text-sm font-medium text-gray-800 flex items-center'>Commision Fee (15%)
                        <ExclamationCircleIcon className='text-gray-500 ml-1 cursor-pointer w-4 h-4' />
                    </span>
                    <span className='font-medium text-sm text-gray-800'>${(totalCommissionFee || 0)?.toFixed(2)}</span>
                </div>
                <div className='flex items-center mb-2 border-b border-b-gray-200 pb-7 justify-between'>
                    <span className='text-sm font-medium text-gray-800'>Total</span>
                    <span className='font-medium text-sm text-gray-800'>${(totalBudget || 0).toFixed(2)}</span>
                </div>
            </div>
        </Modal>
    );
}

export default ModalConfirmToken;

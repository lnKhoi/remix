import {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Radio,
  Skeleton,
} from 'antd';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import {
  addPaymentMethod,
  getPaymentMethods,
  getPaymentsHistory,
  getTotalTokens,
  removePaymentMethod,
} from '~/apis/stripe';
import PaymentCard from '~/assets/balance-card.png';
import Paypal from '~/assets/paypal.png';
import { paymentMethodBrandLogo } from '~/constants/payment.constant';
import type {
  CreditCard,
  Payment,
} from '~/models/payment.model';
import CheckoutForm from '~/sdks/CheckoutForm';

import {
  ExclamationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentMethodsSkeleton from '../custom/skeletons/PaymentMethods';
import TagColor from '../ui/tagColor';
import BuyToken from './BuyToken';
import ModalSuccessPayment from './ModalSuccessPayment';
import PaymentHistory from './PaymentHistory';

function Payment() {
  const [loading, setLoading] = useState<boolean>(false)
  const [cards, setCards] = useState<CreditCard[]>([])
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([])

  const [totalToken, setTotalToken] = useState<number>(0)
  const [addedToken, setAddedToken] = useState<number>(0)
  const [isBuyToken, setIsBuyToken] = useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)
  const [isSelectPayment, setIsSelectPayment] = useState<boolean>(false)
  const [clientSecret, setClientSecret] = useState("");

  const stripePromise = loadStripe("pk_test_51QUrpZQwRo0WgELJhEc1NKIjXzzfCjFgpJpF9jsBeJ0FNRJcx1x1atB2DAYjelT4C6nlcXiR9n6oYwUL8ton1dVy00EWFHCCE6");

  const options = {
    clientSecret: clientSecret
  };

  const getPaymentInfo = () => {
    setLoading(true)
    Promise.all([getPaymentMethods(), addPaymentMethod(), getPaymentsHistory(), getTotalTokens()])
      .then(([paymentMethods, clientIntent, paymentHistory, balance]) => {
        setClientSecret(clientIntent?.data?.clientSecret)
        setCards(paymentMethods?.data)
        setPaymentHistory(paymentHistory?.data?.data)
        setTotalToken(balance?.data?.wallet?.balance)
      })
      .catch(error => { console.error('Error fetching data:', error) })
      .finally(() => setLoading(false))
  };

  useEffect(() => { getPaymentInfo() }, [])

  const handlePayment = (total: number) => {
    setPaymentSuccess(true)
    setAddedToken(total)
  }

  const handleRemovePaymentMethod = (id: string) => {
    setLoadingDelete(true)
    removePaymentMethod(id)
      .then(() => {
        const newPaymentMethod = cards.filter(c => c.stripe_payment_method_id !== id)
        setCards(newPaymentMethod)
      })
      .catch(() => toast.error('Failed to Delete payment method. Try again!'))
      .finally(() => setLoadingDelete(false))
  }

  return (
    <div>
      <ToastContainer />
      <div className='p-5 border flex items-center justify-between border-gray-200 rounded-xl'>
        <div className='flex flex-col gap-1'>
          <p className='text-lg text-gray-800 font-normal'>Available Balance</p>
          <p className='text-2xl font-semibold text-gray-800 flex items-center gap-1'>
            {loading ? <Skeleton.Node style={{ width: 60, height: 25 }} active /> : totalToken} Tokens
          </p>
          <div className='gap-3 flex items-center'>
            <ExclamationCircleIcon className='w-5 h-5 text-gray-800' />
            <p className='text-sm font-normal text-gray-500'>Locked: $0.00</p>
          </div>
          <Button
            onClick={() => setIsBuyToken(true)}
            disabled={cards.length === 0}
            className='w-[50px] mt-3'
            type='primary'>
            Buy
          </Button>
        </div>
        <img src={PaymentCard} alt="balance card" />
      </div>
      <div className='border border-gray-200 py-5 mt-5 rounded-xl'>
        <div className='flex items-center justify-between px-5 pb-5 border-b border-b-gray-200'>
          <p className='text-lg font-semibold text-gray-800'>Payment Methods</p>
          {!isSelectPayment
            ? <Button onClick={() => setIsSelectPayment(true)} type='primary'>Add New</Button>
            : <Button onClick={() => { setIsSelectPayment(false); setPaymentMethod('') }}>Cancel</Button>
          }
        </div>

        {/* SELECT PAYMENT METHOD */}
        {isSelectPayment && (
          <Radio.Group className='w-full' onChange={(v) => setPaymentMethod(v.target.value)} value={paymentMethod}>
            <div className='mt-5 mx-5 flex flex-col gap-7'>
              <Radio value="creditCard">
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-800'>Credit Card</span>
                  <span className='text-xs font-normal text-gray-500'>Visa, Master Card</span>
                </div>
              </Radio >
              {/* CREDIT CARD FORM */}
              <div className='w-calc()'>
                {(paymentMethod === 'creditCard' && clientSecret !== '') &&
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                  </Elements>}
              </div>
              <Radio value="paypal">
                <img className='transform translate-y-1' src={Paypal} alt="paypal" />
              </Radio>
            </div>
          </Radio.Group>
        )}

        {/* NO PAYMENT AVAILABLE */}
        {(paymentMethod === '' && !isSelectPayment && cards.length === 0 && !loading) && (
          <div className='mt-5 flex  flex-col items-center justify-center'>
            <h6 className='font-bold text-gray-800'>No payment link created</h6>
            <p className='mt-1 text-gray-500 text-sm font-normal w-[390px] text-center'>
              Receive payment by sharing alink of a payment page with your customer
            </p>
          </div>
        )}

        {/* CREDIT CARD */}
        {!isSelectPayment && loading && (
          [1, 2, 3].map(s => <PaymentMethodsSkeleton key={s} />)
        )}
        {!isSelectPayment && !loading && cards?.map((card, idx) => (
          <div key={card.id} className='mt-5  px-5 py-4 rounded-xl flex items-center justify-between mx-8 border border-dashed'>
            <div className='flex items-center gap-3'>
              <img className='w-[67px] h-[38px] object-cover rounded-lg'
                src={paymentMethodBrandLogo[card.brand as keyof typeof paymentMethodBrandLogo]}
                alt="payment logo" />
              <div className='flex flex-col'>
                <p className='text-sm font-medium text-gray-800 capitalize'>****{card?.last4}</p>
                <span className='text-xs font-normal mt-[2px] text-gray-500'>Card expired at {card?.exp_year}</span>
              </div>
              {idx === 0 && (
                <TagColor hideCircle status='Primary' color='#0F766E' background='#CCFBF1' />
              )}
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-[36px] transition-all h-[36px] hover:bg-gray-200 cursor-pointer rounded-md flex items-center justify-center bg-gray-100'>
                <PencilSquareIcon className='text-gray-800 w-5 h-5' />
              </div>
              <Button
                className='bg-gray-100 border-none'
                icon={<TrashIcon className='text-gray-800 w-5 h-5' />}
                loading={loadingDelete}
                onClick={() => handleRemovePaymentMethod(card.stripe_payment_method_id)}
              />
            </div>
          </div>
        ))}

        {/* BUY TOKEN */}
        {isBuyToken && (
          <BuyToken
            onPayment={handlePayment}
            onclose={() => setIsBuyToken(false)}
            open={isBuyToken}
            cards={cards}
          />
        )}
      </div>

      {/* PAYMENT HISTORY */}
      <div className='mt-5 flex flex-col gap-6'>
        <p className='text-lg font-semibold text-gray-800'>Payment History</p>
        <PaymentHistory loading={loading} paymentHistory={paymentHistory} />
      </div>

      {/* MODAL PAYMENT SUCCESS */}
      <ModalSuccessPayment
        open={paymentSuccess}
        newToken={addedToken}
        onClose={() => { setPaymentSuccess(false); getPaymentInfo() }}
      />
    </div>
  )
}

export default Payment

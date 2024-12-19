import {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Form,
  Radio,
} from 'antd';
import dayjs from 'dayjs';
import {
  addPaymentMethod,
  getPaymentMethods,
} from '~/apis/stripe';
import PaymentCard from '~/assets/balance-card.png';
import Paypal from '~/assets/paypal.png';
import Visa from '~/assets/visa.png';
import type {
  CardDetails,
  CreditCard,
} from '~/models/payment.model';
import CheckoutForm from '~/sdks/CheckoutForm';

import {
  ExclamationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import TagColor from '../ui/tagColor';
import BuyToken from './BuyToken';
import ModalSuccessPayment from './ModalSuccessPayment';
import PaymentHistory from './PaymentHistory';

function Payment() {
  const [loading, setLoading] = useState<boolean>(false)
  const [cards, setCards] = useState<CreditCard[]>([])
  const [totalToken, setTotalToken] = useState<number>(0)
  const [addedToken, setAddedToken] = useState<number>(0)
  const [isBuyToken, setIsBuyToken] = useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)
  const [isSelectPayment, setIsSelectPayment] = useState<boolean>(false)
  const [form] = Form.useForm();

  const handleAddNewPaymentMethod = (values: CardDetails) => {
    console.log(values)
    form.resetFields()
    setIsSelectPayment(false)
  };

  const getPaymentInfo = () => {
    setLoading(true)
    Promise.all([getPaymentMethods(), addPaymentMethod()])
      .then(([paymentMethods, clientIntent]) => {
        console.log(paymentMethods);
        console.log(clientIntent)
      })
      .catch(error => { console.error('Error fetching data:', error) })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    getPaymentInfo()
  }, [])

  const handlePayment = (total: number) => {
    setPaymentSuccess(true)
    setAddedToken(total)
  }


  const [clientSecret, setClientSecret] = useState(
    "pi_3NCwMIF3hM0gtZIC0ZRtf7tZ_secret_8AgzIqnYbjLGg3s6a1H9HDtf2"
  );

  const stripePromise = loadStripe(
    "pk_test_51KYozEF3hM0gtZICsFOodeIJWhToEUNs2dlIwNZ4Aycsvg2sF76MPTdocUp7gIXPOnBP1UqPZtU3DTDL6FhTAJ7y00doMv5315"
  );

  const options = {
    clientSecret: clientSecret
  };

  return (
    <div>
      <div className='p-5 border flex items-center justify-between border-gray-200 rounded-xl'>
        <div className='flex flex-col gap-1'>
          <p className='text-lg text-gray-800 font-normal'>Actual Balance</p>
          <p className='text-2xl font-semibold text-gray-800'>{totalToken} Token</p>
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
                {paymentMethod === 'creditCard' &&
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
        {(paymentMethod === '' && !isSelectPayment && cards.length === 0) && (
          <div className='mt-5 flex  flex-col items-center justify-center'>
            <h6 className='font-bold text-gray-800'>No payment link created</h6>
            <p className='mt-1 text-gray-500 text-sm font-normal w-[390px] text-center'>
              Receive payment by sharing alink of a payment page with your customer
            </p>
          </div>
        )}

        {/* CREDIT CARD */}
        {!isSelectPayment && cards?.map(card => (
          <div className='mt-5  px-5 py-4 rounded-xl flex items-center justify-between mx-8 border border-dashed'>
            <div className='flex items-center gap-3'>
              <img src={Visa} alt="visa" />
              <div className='flex flex-col'>
                <p className='text-sm font-medium text-gray-800'>{card?.nameOnCard}</p>
                <span className='text-xs font-normal mt-[2px] text-gray-500'>Card expires at {dayjs(card.expirationDate).format('MM-YYYY')}</span>
              </div>
              <TagColor hideCircle status='Primary' color='#0F766E' background='#CCFBF1' />
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-[36px] transition-all h-[36px] hover:bg-gray-200 cursor-pointer rounded-md flex items-center justify-center bg-gray-100'>
                <PencilSquareIcon className='text-gray-800 w-5 h-5' />
              </div>
              <div className='w-[36px] transition-all h-[36px] hover:bg-gray-200 cursor-pointer rounded-md flex items-center justify-center bg-gray-100'>
                <TrashIcon className='text-gray-800 w-5 h-5' />
              </div>
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
        <PaymentHistory />
      </div>

      {/* MODAL PAYMENT SUCCESS */}
      <ModalSuccessPayment
        open={paymentSuccess}
        newToken={addedToken}
        totalToken={totalToken}
        onClose={() => setPaymentSuccess(false)}
        onChangeTotalToken={setTotalToken}
      />
    </div>
  )
}

export default Payment

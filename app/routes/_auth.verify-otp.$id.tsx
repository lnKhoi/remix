import 'react-toastify/dist/ReactToastify.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  toast,
  ToastContainer,
} from 'react-toastify';
import {
  OTPPayload,
  verifyOTP,
} from '~/apis/auth';
import LoginBanner from '~/assets/login-banner.png';
import Logo from '~/assets/logo.svg';
import InputOTP from '~/components/ui/input-otp';
import Loading from '~/components/ui/loading';
import { useCountdown } from '~/hooks/useCountdown';

import { MetaFunction } from '@remix-run/cloudflare';
import {
  useLocation,
  useNavigate,
  useParams,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Spiral - Verify OTP' }]
}

export default function Page() {
  const { id } = useParams()
  const location = useLocation()

  const navigate = useNavigate()
  const [otp, setOtp] = useState<string>('')
  const [err, setErr] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const { time, startCountdown, resetCountdown } = useCountdown(600)
  const { time: time2, startCountdown: start2, isRunning, resetCountdown: reset2 } = useCountdown(60)

  const handleReset = (): void => {
    reset2()
    resetCountdown()
    startCountdown()
    start2()
  }

  const handleVerifyOTP = async (): Promise<void> => {
    setLoading(true)
    const payload = { userId: id, otp: otp }
    await verifyOTP(payload as OTPPayload)
      .then(() => {
        toast.success('Verify successfully!')
        setTimeout(() =>    navigate('/login'),1000)
      })
      .finally(() => setLoading(false))
      .catch((err) => { setErr(err?.message) })
  }

  useEffect(() => { startCountdown(); start2() }, [])

  useEffect(() => { otp.length === 6 && handleVerifyOTP() }, [otp])

  return (
    <div className="flex h-[100vh] w-full items-center justify-between">
      <ToastContainer />
      <div className="flex min-h-full w-1/2 flex-col items-center justify-center">
        <img
          src={Logo}
          alt="logo"
          className="mb-[30px] h-[45px] object-contain"
        />
        <h1 className="mb-2 text-3xl font-bold text-black">Email Verification </h1>
        <p className='mt-2 text-sm text-gray-700'>A Verification code has been sent to</p>
        <span className='text-gray-700 font-bold text-sm mt-1'>{location?.state?.email}</span>
        <div className='mt-8 text-sm text-gray-800'>OTP Expire: {time}</div>
        <InputOTP className="otpContainer mt-[30px]" inputClassName="otpInput" length={6} value={otp} onChange={setOtp} />
        {err && <span className='mt-2 text-red-500 text-sm'>{err}</span>}
        {loading && (
          <div className='flex items-center mt-2 gap-1'>
            <Loading />
            <p className='text-gray-800'>Check your code</p>
          </div>
        )}
        <div className='flex items-center mt-[30px] gap-2'>
          <p className=' text-gray-800 text-sm'>Didn’t receive the code?</p>
          <span onClick={() => isRunning ? null : handleReset()} className={`text-blue-600 text-sm font-bold  ${isRunning ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            Resend code {time2}
          </span>
        </div>
      </div>
      <div className="h-full w-1/2">
        <img
          src={LoginBanner}
          alt="banner"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

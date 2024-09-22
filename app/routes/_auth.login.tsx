import 'react-toastify/dist/ReactToastify.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  Field,
  Form as FormikForm,
  Formik,
} from 'formik';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import * as Yup from 'yup';
import {
  getMe,
  login,
  login3rdParty,
} from '~/apis/auth';
import Fb_icon from '~/assets/facebook.svg';
import Gg_icon from '~/assets/google.svg';
import Is_icon from '~/assets/insta.svg';
import Logo from '~/assets/logo.svg';
import { Button } from '~/components/ui/button';
import { CardDescription } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs';
import {
  EMAIL_REQUIRED,
  INVALID_EMAIL,
} from '~/constants/messages.constant';
import { useAuthContext } from '~/contexts/auth.context';
import {
  GoogleAccount,
  UserType,
} from '~/models/User.model';
import {
  authenticator,
  getSession,
} from '~/services/sessions.server';
import { createPasswordValidationSchema } from '~/validators/account.validator';

import {
  LoaderFunction,
  MetaFunction,
} from '@remix-run/cloudflare';
import {
  Link,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: "Spiral - Login" }];
};

// Yup schema validation
const validationSchema = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL_REQUIRED),
  password: createPasswordValidationSchema(),
});

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  authenticator.logout
  return user || null;
};

export default function Page() {
  const { updateUserInfo } = useAuthContext()
  const [userType, setUserType] = useState<UserType>('creator');
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const user: GoogleAccount = useLoaderData()

  useEffect(() => {
    const handleLogin3rdParty = async () => {
      await login3rdParty('brand', user.emails?.[0]?.value, user?.displayName, '')
        .then((res) => {
          localStorage.setItem('remix_us_tk', res?.data?.id)
          userType === 'creator' ? navigate('/creator/dashboard') : navigate('/manager/dashboard')
        }
        )
    }
    user && handleLogin3rdParty()
  }, [])

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true)
    await login(values.email, values.password)
      .then((res) => {
        localStorage.setItem('remix_us_tk', res?.data?.id)
        handleLogin()
      })
      .catch((err) => toast.error(err?.message))
      .finally(() => setLoading(false))
  };

  const handleLogin = async (): Promise<void> => {
    await getMe().then((res) => {
      updateUserInfo(res.data)
      res.data.role === 'CREATOR'
        ? navigate('/creator/dashboard')
        : navigate('/manager/dashboard')
    })
  }

  return (
    <div className="w-full mx-auto h-[100vh] flex items-center bg-white justify-center">
      <ToastContainer />
      <div className="mx-asuto flex flex-col items-center w-[460px]">
        <img src={Logo} alt="logo" className="mb-[30px]" />
        <h1 className="text-3xl mb-[30px] text-black font-bold">
          Log in to your account
        </h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          validateOnChange={true}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, resetForm, isValid, isSubmitting, setFieldError, values, handleChange }) => {
            // err !== '' ? setErr('') : null
            return (
              <>
                <Tabs
                  onValueChange={(e) => {
                    setUserType(e as UserType);
                    resetForm();
                    localStorage.setItem('remix_tab', e)
                  }}
                  defaultValue={userType}
                  className="w-[460px]"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="creator">Creator</TabsTrigger>
                    <TabsTrigger value="brand">Brands</TabsTrigger>
                  </TabsList>
                  <FormikForm className="mt-[30px]">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Field
                          onChange={handleChange}
                          as={Input}
                          label={userType === 'creator' ? 'Email' : 'Business email'}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="m@example.com"
                          hasError={touched.email && !!errors.email}
                          errorMessage={touched.email && errors.email ? errors.email : ''}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Field
                          as={Input}
                          label='Password'
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          hasError={touched.password && !!errors.password}
                          errorMessage={touched.password && errors.password ? errors.password : ''}
                          required
                        />
                        {/* Error Login */}
                        <Link
                          to="/forgot-password"
                          className="ml-auto inline-block text-gray-800 text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        size="default"
                        loading={loading}
                        className="w-full mt-1"
                        disabled={!isValid || isSubmitting}
                      >
                        Login
                      </Button>

                      <CardDescription className="mt-2">
                        <div className="flex items-center">
                          <div className="flex-grow border-t border-gray-300"></div>
                          <span className="mx-4 text-gray-500">or Login with</span>
                          <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                      </CardDescription>

                      {/* Social Login Buttons */}
                      <div className='flex gap-4 items-center justify-between w-full'>
                        <Button type='button' variant="outline" className="w-full h-[36px]">
                          <img className="mr-1" src={Fb_icon} alt="Facebook" />
                          Facebook
                        </Button>
                        <a href="/auth/google" className='w-full'>
                          <Button type='button' variant="outline" className="w-full h-[36px]">
                            <img className="mr-1" src={Gg_icon} alt="Google" />
                            Google
                          </Button>
                        </a>
                        {/* {userType === 'creator' && (
                        <Button type='button' variant="outline" className="w-full">
                          <img className="mr-1" src={TT_icon} alt="Tiktok" />
                          Tiktok
                        </Button>
                      )} */}
                        <Button type='button' variant="outline" className="w-full h-[36px]">
                          <img className="mr-1" src={Is_icon} alt="Instagram" />
                          Instagram
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 text-center text-sm">
                      Don&apos;t have an account?{' '}
                      <Link to="/register" className="underline font-bold text-blue-500">
                        Sign up
                      </Link>
                    </div>
                  </FormikForm>
                </Tabs>
              </>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

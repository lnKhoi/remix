import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';

import { Checkbox } from 'antd';
import {
  Field,
  FieldArray,
  Form as FormikForm,
  Formik,
} from 'formik';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import * as Yup from 'yup';
import { registerBrand } from '~/apis/auth';
import LoginBanner from '~/assets/login-banner.png';
import Logo from '~/assets/logo.svg';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import PhoneNumberInput from '~/components/ui/input-country';
import SelectGroup from '~/components/ui/select-group';
import { Tabs } from '~/components/ui/tabs';
import { INDUSTRIES } from '~/constants/auth.constant';
import {
  CONFIRM_PASSWORD_REQUIRED,
  EMAIL_REQUIRED,
  FULLNAME_REQUIRED,
  INVALID_EMAIL,
  PASSWORD_MISSMATCH,
} from '~/constants/messages.constant';
import { SignupPayload } from '~/models/User.model';
import { createPasswordValidationSchema } from '~/validators/account.validator';

import { MetaFunction } from '@remix-run/cloudflare';
import {
  Link,
  useNavigate,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [{ title: 'Spiral - Register' }]
}

// Yup schema validation with yup-phone
const validationSchema = Yup.object().shape({
    name: Yup.string().required(FULLNAME_REQUIRED),
    email: Yup.string().email(INVALID_EMAIL).required(EMAIL_REQUIRED),
    password: createPasswordValidationSchema(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], PASSWORD_MISSMATCH)
        .required(CONFIRM_PASSWORD_REQUIRED),
})

export default function Page() {
    const navigate = useNavigate()
    const [phone, setPhone] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [accepted, setAccepted] = useState<boolean>(true)

    const handleSubmit = (values: SignupPayload) => {
        setLoading(true)
        delete values.confirmPassword
        const payload = { ...values, phone: phone }

        const register = registerBrand(payload)
        register
            .then(res => navigate(`/verify-otp/${res?.data?.userId}`, {
                state: { email: values.email },
            }))
            .finally(() => setLoading(false))
            .catch((err) => toast.error(err?.message))
    }

    return (
        <div className="flex h-[100vh] w-full items-center justify-between">
            <ToastContainer />
            <div className="flex min-h-full w-1/2 flex-col items-center justify-center">
                <img
                    src={Logo}
                    alt="logo"
                    className="mb-[30px] h-[45px] object-contain"
                />
                <h1 className="mb-[30px] text-3xl font-bold text-black">Sign up</h1>
                <Formik
                    initialValues={{
                        name: '',
                        phone: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        industry: [''],
                        category: ['']
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values)
                        setSubmitting(false)
                    }}
                >
                    {({
                        errors,
                        touched,
                        resetForm,
                        isValid,
                        isSubmitting,
                        values,
                        setFieldValue,
                    }) => (
                        <>
                            <Tabs
                                defaultValue="creator"
                                className="w-[460px]"
                            >

                                <FormikForm className="mt-[30px]">
                                    <div className="grid gap-4">
                                        {/* Full Name Field */}
                                        <Field
                                            as={Input}
                                            label="Full name"
                                            name="name"
                                            type="text"
                                            placeholder="e.g. John Marr"
                                            hasError={touched.name && !!errors.name}
                                            errorMessage={
                                                touched.name && errors.name ? errors.name : ''
                                            }
                                            required
                                        />

                                        {/* Email Field */}
                                        <Field
                                            as={Input}
                                            id="email"
                                            name="email"
                                            label={'Business email'}
                                            type="email"
                                            placeholder="m@example.com"
                                            hasError={touched.email && !!errors.email}
                                            errorMessage={
                                                touched.email && errors.email ? errors.email : ''
                                            }
                                            required
                                        />

                                        {/* Phone Number Field */}
                                        <PhoneNumberInput value={phone} onChange={setPhone} />

                                        {/* Industry - Category Field */}
                                        <FieldArray
                                            name={"category"}
                                            render={() => (
                                                <div>
                                                    <SelectGroup
                                                        options={INDUSTRIES}
                                                        label={'Industry'}
                                                        value={values.category}
                                                        onChange={value =>
                                                            setFieldValue('category', value)
                                                        }
                                                    />
                                                </div>
                                            )}
                                        />

                                        {/* Password Field */}
                                        <Field
                                            as={Input}
                                            label="Password"
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            hasError={touched.password && !!errors.password}
                                            errorMessage={
                                                touched.password && errors.password
                                                    ? errors.password
                                                    : ''
                                            }
                                            required
                                        />

                                        {/* Confirm Password Field */}
                                        <Field
                                            as={Input}
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            hasError={
                                                touched.confirmPassword && !!errors.confirmPassword
                                            }
                                            errorMessage={
                                                touched.confirmPassword && errors.confirmPassword
                                                    ? errors.confirmPassword
                                                    : ''
                                            }
                                            required
                                        />

                                        <div className="flex items-center gap-4">
                                            <div className="h-full pt-1">
                                                <Checkbox defaultChecked={accepted} value={true} onChange={(e) => setAccepted(!accepted)} ></Checkbox>
                                            </div>
                                            <div className="text-sm leading-5 text-gray-800">
                                                By clicking on signup you agree to{' '}
                                                <a href="/privacy-policy" target="_blank">
                                                    <span className="cursor-pointer underline">
                                                        Terms of Services
                                                    </span>{' '}
                                                    and{' '}
                                                    <span className="cursor-pointer underline">
                                                        Privacy Policy
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => handleSubmit(values)}
                                            size="default"
                                            disabled={!accepted}
                                            loading={loading}
                                            className="mt-1 w-full"
                                        >
                                            Sign Up
                                        </Button>
                                    </div>

                                    <div className="mt-4 text-center text-sm text-gray-800">
                                        Already have an account?{' '}
                                        <Link
                                            to="/login"
                                            className="font-bold text-blue-500 underline"
                                        >
                                            Log in
                                        </Link>
                                    </div>
                                </FormikForm>
                            </Tabs>
                        </>
                    )}
                </Formik>
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

import {
  getData,
  postData,
} from './axiosClient';

export const addPaymentMethod = () => {
    return postData(`/api/v1/payment/setup-intent`)
}

export const getPaymentMethods = () => {
    return getData(`/api/v1/payment/payment-methods`)
}

export const getPaymentsHistory = () => {
    return getData(`/api/v1/payment/payment-history`)
}

export const buyToken = (amount: number, paymentId: string) => {
    return postData(`/api/v1/payment/process-payment`, { paymentMethodId: paymentId, amount: amount })
}

export const getTotalTokens = () => {
    return getData(`/api/v1/user/wallet`)
}

export const removePaymentMethod = (id: string) => {
    return postData(`/api/v1/payment/unlink-payment-method`, { paymentMethodId: id })
}

export const downloadInvoice = (id:string) => {
    return getData(`/api/v1/payment/download-invoice/${id}`)
}
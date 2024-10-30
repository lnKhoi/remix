import { getData } from './axiosClient';

export const connectShopify = (shopName:string) => {
    return getData(`/api/v1/auth/shopifyLogin?shop=${shopName}.myshopify.com`)
}
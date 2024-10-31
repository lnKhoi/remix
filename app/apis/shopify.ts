import { getData } from './axiosClient';

export const connectShopify = (shopName:string) => {
    return getData(`/api/v1/auth/shopifyLogin?shop=${shopName}.myshopify.com`)
}

export const getDiscountCodeShopify = (shopId:string) => {
    return getData(`/api/v1/shop/shopify/${shopId}/discounts`)
}

export const getShopId = () => {
    return getData(`/api/v1/brand/shops`)
}
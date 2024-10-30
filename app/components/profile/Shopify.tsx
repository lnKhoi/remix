import React, { useState } from 'react';

import {
  Button,
  Input,
} from 'antd';
import { connectShopify } from '~/apis/shopify';
import ShopifyLogo from '~/assets/shopify.png';

function Shopify() {
    const [shopUrl, setShopUrl] = useState<string>('')
    const [loading,setLoading] = useState<boolean>(false)

    const handleConnectShopify = () => {
        setLoading(true)
        connectShopify(shopUrl)
        .then((res) => {
            window.open(`${res?.data?.url}`, '_blank', 'noopener,noreferrer');
        })
        .finally(() => setLoading(false))

    }

    return (
        <div className='w-[450px] mt-2 mx-auto flex flex-col items-center justify-center'>
            <img src={ShopifyLogo} alt="shopify" />
            <p className='mt-3 text-lg font-semibold'>Connect your Shopify store</p>
            <p className='mt-3 text-gray-500 text-sm font-normal text-center'>Easily integrate your Shopify store with our platform to streamline your sales process, manage inventory, and enhance customer experiences. Get started today to unlock powerful features and boost your online business!</p>
            <Input
                onChange={(e) => setShopUrl(e.target.value)}
                suffix='.myshopify.com'
                className='mt-8 hover:bg-gray-100 focus:bg-gray-100 bg-gray-100 border-none'
                placeholder='yourshopname' />
            <div className='w-full mt-4'>
                <Button
                    loading={loading}
                    onClick={handleConnectShopify}
                    type='primary'
                    className='w-full'>
                    Connect my Store
                </Button>
            </div>
        </div>
    )
}

export default Shopify

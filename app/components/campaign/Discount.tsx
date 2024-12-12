import {
  useEffect,
  useState,
} from 'react';

import {
  DatePicker,
  Form,
  FormInstance,
  Select,
} from 'antd';
import {
  getDiscountCodeShopify,
  getProducts,
  getShopId,
} from '~/apis/shopify';
import { DISCOUNT_REQUIRED } from '~/constants/messages.constant';
import {
  DiscountCode,
  Product,
} from '~/models/shopify.model';

import { PlusIcon } from '@heroicons/react/24/outline';

import ModalCreateDiscount from './ModalCreateDiscount';

interface DiscountProps {
    form: FormInstance
}
const { RangePicker } = DatePicker;

const Discount = ({ form }: DiscountProps) => {
    const [modal, setModal] = useState<boolean>(false)
    const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
    const [products, setProducts] = useState<Product[]>([])
    const [shopId, setShopId] = useState<string>('')


    const handleGetShopifyId = () => {
        getShopId().then(res => {
            setShopId(res?.data?.[0]?.id)
            handleGetDiscountCode(res?.data?.[0]?.id)
            handleGetProducts(res?.data?.[0]?.id)
        })
    }

    const handleGetDiscountCode = (shopId: string) => {
        getDiscountCodeShopify(shopId).then((res) => setDiscountCodes(res.data?.discounts))
    }

    const handleGetProducts = (shopId: string) => {
        getProducts(shopId).then(res => setProducts(res.data.products))
    }

    useEffect(() => {
        handleGetShopifyId()
    }, [])

    return (
        <div className="flex flex-col pt-8 items-start mt-6 border-t border-t-gray-200">
            {/* <ToastContainer /> */}
            {/* Discounts */}
            <p className="text-lg font-semibold">Discount</p>
            <div className="w-full flex items-start justify-between gap-5">
                <Form.Item
                    className="w-full"
                    label=""
                    name="removed"
                    rules={[{ required: true, message: DISCOUNT_REQUIRED }]}
                >
                    <Select
                        placeholder="Select option"
                        className="mt-[5px] w-full"
                        onSelect={(value, option) => {
                            if (form) {
                                form.setFieldValue('discountType', option.discountType);
                                form.setFieldValue('discountCode', option.label);
                                form.setFieldValue('discountValue', option.discountValue);
                            }
                        }}
                        options={discountCodes?.map((c) => ({
                            value: c?.value + c.title + c.value_type,
                            label: c?.title,
                            discountType: c?.value_type,
                            discountValue:c?.value
                        }))}
                    />
                </Form.Item>
            </div>
            <div onClick={() => setModal(true)} className="text-blue-500 cursor-pointer flex items-center gap-1 text-sm">
                <PlusIcon
                    className="w-4 text-blue-500" />
                Create discount
            </div>

            {/* Products */}
            <p className="text-lg font-semibold mt-5">Product</p>
            <div className="w-full flex items-start justify-between gap-5">
                <Form.Item
                    className="w-full"
                    label=""
                    name="productIds"
                    rules={[{ required: true, message: DISCOUNT_REQUIRED }]}
                >
                    <Select
                        placeholder="Select option"
                        mode="multiple"
                        className="mt-[5px] w-full"
                        options={products?.map((product) => ({
                            value: String(product.id),
                            label: (
                                <div className="flex items-center">
                                    <img
                                        src={product.thumbnail.src}
                                        alt={product.title}
                                        className="w-4 h-4 mr-2"
                                    />
                                    {product.title}
                                </div>
                            ),
                        }))}
                    />
                </Form.Item>
            </div>

            {/* Modal Create Discount */}
            {modal && (
                <ModalCreateDiscount
                    open={modal}
                    onrefresh={handleGetShopifyId}
                    onClose={() => setModal(false)}
                    shopId={shopId}
                    products={products}
                />
            )}
        </div>
    );
};

export default Discount;

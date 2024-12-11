import React from 'react';

import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
} from 'antd';

type CreditCardProps = {
    form: FormInstance;
    onFinish: (values: any) => void;
};

function CreditCardForm({ form, onFinish }: CreditCardProps) {
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="flex flex-col w-[626px]"
        >
            {/* Name on Card */}
            <Form.Item
                name="nameOnCard"
                label="Name On Card *"
                rules={[{ required: true, message: 'Please enter the name on card' }]}
            >
                <Input placeholder="Enter your name" className="border-gray-100 bg-gray-100 rounded-lg" />
            </Form.Item>

            {/* Card Number */}
            <Form.Item
                name="cardNumber"
                label="Card Number *"
                rules={[
                    { required: true, message: 'Please enter the card number' },
                    { pattern: /^[0-9]{16}$/, message: 'Card number must be 16 digits' },
                ]}
            >
                <Input maxLength={16} placeholder="Enter card number" className="border-gray-100 bg-gray-100 rounded-lg" />
            </Form.Item>

            {/* Expiration Date and CVV */}
            <div className="flex gap-4">
                <Form.Item
                    name="expirationDate"
                    label="Expiration Date *"
                    rules={[{ required: true, message: 'Please select the expiration date' }]}
                    className="flex-1"
                >
                    <DatePicker
                        picker="month"
                        placeholder="MM/YY"
                        className="border-gray-100 w-full bg-gray-100 rounded-lg"
                    />
                </Form.Item>

                {/* CVV */}
                <Form.Item
                    name="cvv"
                    label="CVV *"
                    rules={[
                        { required: true, message: 'Please enter the CVV' },
                        { pattern: /^[0-9]{3}$/, message: 'CVV must be 3 digits' },
                    ]}
                    className="flex-1"
                >
                    <Input maxLength={3} placeholder="CVV" className="border-gray-100 bg-gray-100 rounded-lg"/>
                </Form.Item>
            </div>

            {/* Save Button */}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}

export default CreditCardForm;

import 'react-credit-cards-2/dist/es/styles-compiled.css';
import 'antd/dist/reset.css';

import React, {
  ChangeEvent,
  FocusEvent,
  useState,
} from 'react';

import {
  Button,
  Input,
} from 'antd';
import Cards from 'react-credit-cards-2';
import { addPaymentMethod } from '~/apis/stripe';
import { initialCardDetails } from '~/constants/payment.constant';
import { CardDetails } from '~/models/payment.model';

import { loadStripe } from '@stripe/stripe-js';

type CreditCardFormProps = {
  onFinish: () => void
}

const CreditCardForm = ({ }: CreditCardFormProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [cardDetails, setCardDetails] = useState<CardDetails>(initialCardDetails);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "number") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4);
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setCardDetails({ ...cardDetails, focus: e.target.name });
  };

  const handleSave = () => {
    setLoading(true)
    addPaymentMethod().then(res => console.log(res)).finally(() => setLoading(false))
    console.log("Saved Card Details:", cardDetails);
  };

  const stripePromise = loadStripe('pk_test_51QUrpZQwRo0WgELJhEc1NKIjXzzfCjFgpJpF9jsBeJ0FNRJcx1x1atB2DAYjelT4C6nlcXiR9n6oYwUL8ton1dVy00EWFHCCE6');

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto">

      <form id="payment-form">
        <div id="card-element">
        </div>
        <button type="submit">Submit Payment</button>
      </form>
      <div id="error-message"></div>

      {/* Card Preview */}
      <div className="w-full md:w-1/2">
        <Cards
          number={cardDetails.number}
          name={cardDetails.name}
          expiry={cardDetails.expiry}
          cvc={cardDetails.cvc}
          focused={cardDetails.focus as any}
        />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <Input
          type="tel"
          name="number"
          placeholder="Card Number (e.g., 1234 5678 9012 3456)"
          value={cardDetails.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength={19} // Including spaces
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={cardDetails.name}
          maxLength={27}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="flex gap-4">
          <Input
            type="text"
            name="expiry"
            placeholder="MMYY (e.g., 1225)"
            value={cardDetails.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength={4}
            className="w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Input
            type="tel"
            name="cvc"
            placeholder="CVV"
            value={cardDetails.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength={4}
            className="w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Save Button */}
        <Button
          loading={loading}
          type="primary"
          onClick={handleSave}
          className="mt-"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreditCardForm;

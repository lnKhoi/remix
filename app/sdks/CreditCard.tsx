import 'react-credit-cards-2/dist/es/styles-compiled.css';
import 'antd/dist/reset.css';

import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  useState,
} from 'react';

import {
  Button,
  Input,
} from 'antd';
import Cards from 'react-credit-cards-2';

interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focus: string;
}

const CreditCardForm: FC = () => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "number") {
      formattedValue = value
        .replace(/\D/g, "") // Remove non-numeric
        .replace(/(.{4})/g, "$1 ") // Add space after every 4 digits
        .trim(); // Trim spaces
    }

    if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "") // Remove non-numeric
        .slice(0, 4); // Limit to 4 digits (MMYY)
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setCardDetails({ ...cardDetails, focus: e.target.name });
  };

  const handleSave = () => {
    console.log("Saved Card Details:", cardDetails);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto">
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

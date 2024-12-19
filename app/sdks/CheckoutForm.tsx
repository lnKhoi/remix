import React from 'react';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripeError } from '@stripe/stripe-js';

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleError = (error: StripeError) => {
        alert(error.message || 'An unknown error occurred.');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded
            alert('Stripe.js is not loaded yet.');
            return;
        }

        // Confirm the payment using the Payment Element
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://example.com/order/complete', // Replace with your return URL
                payment_method_data: {
                    billing_details: {
                        name: 'Jenny Rosen',
                    },
                },
            },
            redirect: 'if_required', // Prevents automatic redirection
        });

        if (error) {
            handleError(error);
        } else if (paymentIntent) {
            alert(`PaymentIntent created: ${paymentIntent.id}`);
        }
    };

    return (
        <form className='max-w-[1200px]' onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;

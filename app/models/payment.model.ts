export type CreditCard = {
    id: string;
    user_id: string;
    stripe_payment_method_id: string;
    type: string;
    last4: string;
    brand: string;
    created_at: string;
}

export type TransactionHistory = {
    time:string,
    type:string
    amount:number
}

export type CardDetails = {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
    focus: string;
  }
  
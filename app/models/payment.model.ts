export type CreditCard = {
    id: string;
    user_id: string;
    stripe_payment_method_id: string;
    type: string;
    last4: string;
    brand: string;
    exp_year:string
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
  

  export type  Payment = {
    id: string;
    amount: number;
    status: string;
    invoice_id: string;
    created_at: string;
    type: string;
    last4:string
    brand: string;
  }
  
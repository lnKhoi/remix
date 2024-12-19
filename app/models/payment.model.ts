export type CreditCard = {
    nameOnCard:string
    cardNumber:string
    expirationDate:string,
    cvv:string
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
  
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
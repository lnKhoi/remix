export type CampaignsInFinance = {
    campaignName: string
    creatorCount: number
    totalBudget: number
    totalTokenEarned: number
}

export type FinanceMetrics = {
    totalMembers:number
    totalPayment:number
    totalPaid:number
}

export type MemberInCampaign = {
    paymentDate:string
    amountToPay:number
    creatorName:string
    status:string
}
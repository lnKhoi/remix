import { getData } from './axiosClient';

export const getCampaignsInFinance = () => {
    return getData(`/api/v1/finance/campaigns/financial-details`)
}

export const getFinanceMetrics = () => {
    return getData(`/api/v1/finance/campaigns/metrics`)
}

export const getMembersInFinance = (campaignId:string) => {
    return getData(`/api/v1/finance/campaigns/${campaignId}/creators`)
}

export const getCampaignMetrics = (campaignId:string) => {
    return getData(`/api/v1/finance/campaigns/${campaignId}/metrics`)
}
import { getData } from './axiosClient';

export const getCampaignsInFinance = (page: number, limit: number,search:string) => {
    return getData(`/api/v1/finance/campaigns/financial-details?page=${page}&limit=${limit}&campaignName=${search}`)
}

export const getFinanceMetrics = () => {
    return getData(`/api/v1/finance/campaigns/metrics`)
}

export const getMembersInFinance = (campaignId: string) => {
    return getData(`/api/v1/finance/campaigns/${campaignId}/creators`)
}

export const getCampaignMetrics = (campaignId: string) => {
    return getData(`/api/v1/finance/campaigns/${campaignId}/metrics`)
}
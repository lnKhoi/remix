import { getData } from './axiosClient';

export const getCampaignROI = (camaignId: string) => {
    return getData(`/api/v1/report/${camaignId}/campaign-roi?timeRange=7d`)
}

export const getCampaignConversionRate = (camaignId: string) => {
    return getData(`/api/v1/report/${camaignId}/campaign-performance?timeRange=7d`)
}

export const getCostPerConversion = (camaignId: string) => {
    return getData(`/api/v1/report/cost-per-conversion?campaignId=${camaignId}`)
}

export const getCostPerClicks = (camaignId: string) => {
    return getData(`/api/v1/report/cost-per-click?campaignId=${camaignId}`)
}

export const getInfluencerInReport = (campaignId:string) => {
    return getData(`/api/v1/campaign/${campaignId}/instagram-statistics-list-influencers?from=2023-11-19&to=2025-11-20`)
}

export const getIGAudienceOfInfluencer = (campaignId:string,creatorId:string) => {
    return getData(`/api/v1/campaign/${campaignId}/instagram-statistics/${creatorId}`)
}

export const getRevenueOfInfluencer = (campaignId:string,creatorId:string) => {
    return getData(`/api/v1/report/${campaignId}/${creatorId}/shopify-detail-statistic`)
}
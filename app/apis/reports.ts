import { getData } from './axiosClient';

export const getCampaignROI = (camaignId: string) => {
    return getData(`/api/v1/report/${camaignId}/campaign-roi?timeRange=7d`)
}

export const getCampaignConversionRate = (camaignId: string) => {
    return getData(`/api/v1/report/${camaignId}/campaign-performance?timeRange=7d`)
}

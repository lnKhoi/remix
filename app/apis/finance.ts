import { DateRange } from '~/components/ui/ModalSelectTimeRange';

import { getData } from './axiosClient';

export const getCampaignsInFinance = (page: number, limit: number, search: string, time: string, dates: DateRange) => {
    const dateRangeQuery = dates
        ? `&from=${dates?.[0]}&to=${dates?.[1]}`
        : '';

    return getData(`/api/v1/finance/campaigns/financial-details?timeRange=${time}${dateRangeQuery}?page=${page}&limit=${limit}&campaignName=${search}`)
}

export const getFinanceMetrics = (time: string, dates: DateRange) => {
    const dateRangeQuery = dates
        ? `&from=${dates?.[0]}&to=${dates?.[1]}`
        : '';

    return getData(`/api/v1/finance/campaigns/metrics?timeRange=${time}${dateRangeQuery}`)
}

export const getMembersInFinance = (campaignId: string, time: string, dates: DateRange) => {
    const dateRangeQuery = dates
        ? `&from=${dates?.[0]}&to=${dates?.[1]}`
        : '';
    return getData(`/api/v1/finance/campaigns/${campaignId}/creators?timeRange=${time}${dateRangeQuery}`)
}

export const getCampaignMetrics = (campaignId: string, time: string, dates: DateRange) => {
    const dateRangeQuery = dates
        ? `&from=${dates?.[0]}&to=${dates?.[1]}`
        : '';
    return getData(`/api/v1/finance/campaigns/metrics?timeRange=${time}${dateRangeQuery}?campaignId=${campaignId}`)
}
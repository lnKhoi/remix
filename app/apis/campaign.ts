import { Campaign } from '~/models/Campaign.model';

import {
  deleteData,
  getData,
  patchData,
  postData,
} from './axiosClient';

export const createCampaign = (payload: Campaign) => {
    return postData('/api/v1/campaign', payload)
}

export const getCampaigns = (limit: number, page: number) => {
    return getData(`/api/v1/campaign?limit=${limit}&page=${page}`)
}

export const getCampaignDetails = (id: string) => {
    return getData(`/api/v1/campaign/${id}`)
}

export const updateCampaign = (payload: Campaign, id: string) => {
    return patchData(`/api/v1/campaign/${id}`, payload)
}

export const deleteCampaign = (id: string) => {
    return deleteData(`/api/v1/campaign/${id}`)
}
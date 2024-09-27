import { Campaign } from '~/models/Campaign.model';

import {
  getData,
  postData,
} from './axiosClient';

export const createCampaign = (payload: Campaign) => {
    return postData('/api/v1/campaign', payload)
}

export const getCampaigns = () => {
    return getData('/api/v1/campaign?limit=10&page=1')
}

export const getCampaignDetails = () => {
    return getData('/api/v1/campaign/campaign_01J8SA387S3QK2WXHPSS4SGEQ2')
}

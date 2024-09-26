import { Campaign } from '~/models/Campaign.model';

import { postData } from './axiosClient';

export const createCampaign = (payload: Campaign) => {
    return postData('/api/v1/campaign', payload)
}

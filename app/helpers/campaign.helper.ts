import { CampaignStatus } from '~/models/Campaign.model';
import { InfluencerContentStatus } from '~/models/User.model';

export const getColorStatusCampaign = (status: CampaignStatus) => {
    switch (status) {
        case 'active':
            return { color: '#0F766E', background: '#CCFBF1' }
        case "archive":
            return { color: '#374151', background: '#E5E7EB' }
        case 'draft':
            return { color: '#1D4ED8', background: '#DBEAFE' }
        default:
            break;
    }
}

export type ContentStatus = 'pending' | 'approved' | 'rejected'

export const getColorStatusContent = (status: ContentStatus) => {
    switch (status) {
        case 'approved':
            return { color: '#0F766E', background: '#CCFBF1',status:'Approved' }
        case "pending":
            return { color: '#374151', background: '#E5E7EB',status:'Not Reviewed Yet' }
        case 'rejected':
            return { color: '#B91C1C', background: '#FEE2E2',status:'Rejected' }
        default:
            break;
    }
}


export const getColorInfluencerContent = (status: InfluencerContentStatus) => {
    switch (status) {
        case 'waiting_to_apply':
            return { color: '#374151', background: '#E5E7EB', status:'Waiting to apply' }
        case "accepted_invitation":
            return { color: '#A16207', background: '#FFEDD5', status:'Waiting for approve' }
        case 'joined_campaign':
            return { color: '#0F766E', background: '#CCFBF1',status:'Approved' }
        default:
            break;
    }
}
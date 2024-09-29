import { CampaignStatus } from '~/models/Campaign.model';

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

export type ContentStatus = 'not-review' | 'approved' | 'rejected'

export const getColorStatusContent = (status: ContentStatus) => {
    switch (status) {
        case 'approved':
            return { color: '#0F766E', background: '#CCFBF1' }
        case "not-review":
            return { color: '#374151', background: '#E5E7EB' }
        case 'rejected':
            return { color: '#B91C1C', background: '#FEE2E2' }
        default:
            break;
    }
}

export type InfluencerContentStatus = 'waiting to accept' | 'declined' | 'rejected' | 'review'

export const getColorInfluencerContent = (status: InfluencerContentStatus) => {
    switch (status) {
        case 'waiting to accept':
            return { color: '#374151', background: '#E5E7EB' }
        case "declined":
            return { color: '#B91C1C', background: '#FEE2E2' }
        case 'rejected':
            return { color: '#A16207', background: '#FFEDD5' }
        default:
            break;
    }
}
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

export const getInfluencerInviteInCampaign = (limit: number, page: 1) => {
    return getData(`/api/v1/brand/imported-influencers?limit=${limit}&page=${page}`)
}

export const getListInfluencerInviteInCampaign = (camaignId: string, limit: number, page: 1) => {
    return getData(`/api/v1/brand/${camaignId}/creators-for-inviting?limit=${limit}&page=${page}`)
}

export const inviteInfluencerToCampaign = (camaignId: string, creatorIds: string[]) => {
    return postData(`/api/v1/brand/${camaignId}/invite`, { creatorIds: creatorIds })
}

export const getInfluencerParticipantsInCampaign = (status: string, campaignId: string, limit: number, page: number) => {
    return getData(`/api/v1/campaign/${campaignId}/influencers?limit=${limit}&page=${page}${status === '' ? '' : `&status=brand_declined_influencer`}`)
}

export const brandUpdateInvitationStatus = (campaignId: string, creatorId: string, status: boolean) => {
    return postData(`/api/v1/brand/${campaignId}/${creatorId}/approve`, { approved: status })
}

export const getContentsInCampaign = (campaignId: string, limit: number, page: number) => {
    return getData(`/api/v1/content/campaign/${campaignId}?limit=${limit}&page=${page}`)
}

export const getMediaContentInCampaign = (campaignId: string, media: string) => {
    return getData(`api/v1/content/media/${media}`)
}

export const getContentDetails = (id:string) => {
    return getData(`api/v1/content/${id}`)
}

export const reviewContent = (campaignId:string,contentId:string,reason?:string,status?:boolean) => {
    return postData(`api/v1/brand/${campaignId}/${contentId}/approve-content`,{approved:status,reason:reason})
}

export const getMedia = (campaignId:string,filename:string) => {
    return getData(`http://localhost:8787/api/v1/content/media/${filename}`)
}
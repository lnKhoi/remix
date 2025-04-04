import { FormData } from '~/components/content/ModalFilterContent';

import {
  getData,
  postData,
} from './axiosClient';

export const approveContent = (campaignId: string, contentId: string, status: boolean, date: string, reason: string) => {
    return postData(`api/v1/brand/${campaignId}/${contentId}/approve-content`,
        { approved: status, reason: reason, post_due: date })
}

export const publishContent = (contentId: string, flatForm: string) => {
    return postData(`api/v1/content/${contentId}/publish/${flatForm}`)
}

export const getContentMetrics = (campaignId: string) => {
    return postData(`api/v1/content/campaign/${campaignId}/live-posts`)
}

export const approveContentLinkStory = (contentId: string, status: boolean, reason: string) => {
    return postData(`/api/v1/brand/${contentId}/approve-post-link`, { approve: status, reason: reason })
}

export const requestNewDeadlineForInfluencer = (campaignId: string, creatorId: string, deadline: string) => {
    return postData(`/api/v1/brand/${campaignId}/${creatorId}/approve-suggested-deadline`, {
        approved: true,
        newDeadline: deadline
    })
}

export const approveDeadlineFromInfluencer = (campaignId: string, creatorId: string) => {
    return postData(`/api/v1/brand/${campaignId}/${creatorId}/approve-suggested-deadline`, {
        approved: true
    })
}

export const disputeContent = (contentId: string, reason: string) => {
    return postData(`/api/v1/brand/${contentId}/dispute-story-content`, { reason: reason })
}

export const getContents = (page: number, limit: number, search: string, filter: FormData | null) => {
    return postData(`/api/v1/content?limit=${limit}&page=${page}&name=${search}`, filter ?? undefined)
}

export const getAllInfluencerInContent = () => {
    return getData(`/api/v1/brand/imported-influencers?keywrod=&action=filter`)
}

export const getAllCampaigns = () => {
    return getData(`/api/v1/campaign?keyword=&action=filter`)
}
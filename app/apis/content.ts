import { postData } from './axiosClient';

export const approveContent = (campaignId: string, contentId: string, status: boolean, date: string, reason: string) => {
    return postData(`api/v1/brand/${campaignId}/${contentId}/approve-content`,
        { approved: status, reason: reason, post_due: date })
}

export const publishContent = (contentId: string, flatForm:string) => {
    return postData(`api/v1/content/${contentId}/publish/${flatForm}`)
}

export const getContentMetrics = (campaignId: string) => {
    return postData(`api/v1/content/campaign/${campaignId}/live-posts`)
}
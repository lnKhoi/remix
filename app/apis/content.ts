import { postData } from './axiosClient';

export const approveContent = (campaignId: string, contentId: string, status: boolean, date: string, reason: string) => {
    return postData(`api/v1/brand/${campaignId}/${contentId}/approve-content`,
        { approved: status, reason: reason, post_due: date })
}
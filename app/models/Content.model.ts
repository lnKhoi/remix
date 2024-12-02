import { User } from './User.model';

export type Content ={
    id: string;
    campaignId: string;
    creatorId: string;
    urls: string[];
    approved: 'pending' | 'approved' | 'rejected' |'posted' | 'influencer-approved'
    approvedBy: string | null;
    reason: string | null;
    caption: string;
    notes: string;
    engagementRate:number
    isDeleted: boolean;
    conversionRate:number
    deletedAt: string | null;
    creator:User
    createdAt: string;
    post_due?:string,
    trackingUrl?:string,
    updatedAt: string;
  }
import { User } from './User.model';

export type Content ={
    id: string;
    campaignId: string;
    creatorId: string;
    url: string;
    approved: 'pending' | 'approved' | 'rejected'; 
    approvedBy: string | null;
    reason: string | null;
    caption: string;
    notes: string;
    isDeleted: boolean;
    deletedAt: string | null;
    creator:User
    createdAt: string;
    post_due?:string,
    trackingUrl?:string,
    updatedAt: string;
  }
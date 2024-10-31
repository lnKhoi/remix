import { User } from './User.model';

export type Campaign = {
    name: string; 
    deadline: string; 
    id?:string,
    budget: number;
    age?:number []
    gender: 'male' | 'female' | 'all'; 
    discountType: 'percentage' | 'fixed'; 
    status: CampaignStatus
    socialMedia: string[]; 
    location: string; 
    discount: number; 
    campaignOverview: string; 
    isDeleted?: boolean; 
    joinedCreators?:User []
    discountValue?:number,
    discountCode?:number
    deletedAt?: string; 
  }

 export type CampaignStatus = 'active' | 'draft' | 'archive'
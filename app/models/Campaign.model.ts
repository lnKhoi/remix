export type Campaign = {
    name: string; 
    deadline: string; 
    id?:string,
    budget: number;
    minAge: number; 
    maxAge: number;
    gender: 'male' | 'female' | 'all'; 
    discountType: 'percentage' | 'fixed'; 
    status: CampaignStatus
    socialMedia: string[]; 
    location: string; 
    discount: number; 
    campaignOverview: string; 
    isDeleted?: boolean; 
    deletedAt?: string; 
  }

 export type CampaignStatus = 'active' | 'draft' | 'archive'
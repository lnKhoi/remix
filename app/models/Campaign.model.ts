export type Campaign = {
    name: string; 
    deadline: string; 
    budget: number;
    minAge: number; 
    maxAge: number;
    gender: 'male' | 'female' | 'all'; 
    discountType: 'percentage' | 'fixed'; 
    status: 'active' | 'draft' | 'archive'; 
    socialMedia: string[]; 
    location: string; 
    discount: number; 
    campaignOverview: string; 
    isDeleted?: boolean; 
    deletedAt?: string; 
  }
  
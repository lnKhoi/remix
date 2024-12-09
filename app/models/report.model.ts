import { Creator } from './User.model';

export type ReportCampaign = {
    totalImpressions: number;
    engagementRate: number;
    totalClicks: number;
    conversionRate: number;
    totalRevenue: number;
    costPerConversion: number;
    costPerClicks: number;
    totalPurchases:number
    roi: number;
    cpa:number
    totalCtr?:number,
    totalCost?:number
    influencers: InfluencerInReport[]
};

export type InfluencerInReport = {
    creatorId: string;
    totalImpressions: number;
    totalFollowers: number;
    totalInteractions: number;
    engagementRate: number;
    totalPurchases:number
    conversionRate: number;
    creator: Creator;
}
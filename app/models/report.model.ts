import { Creator } from './User.model';

export type ReportCampaign = {
    totalImpressions: number;
    engagementRate: number;
    totalClicks: number;
    conversionRate: number;
    totalRevenue: number;
    costPerConversion: number;
    costPerClicks: number;
    roi: number;
    totalCost?:number
    influencers: InfluencerInReport[]
};

export type InfluencerInReport = {
    creatorId: string;
    totalImpressions: number;
    totalFollowers: number;
    totalInteractions: number;
    engagementRate: number;
    conversionRate: number;
    creator: Creator;
}
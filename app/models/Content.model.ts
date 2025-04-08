import { Dayjs } from 'dayjs';

import { Campaign } from './Campaign.model';
import { User } from './User.model';

export type Content = {
  id: string;
  campaignId: string;
  creatorId: string;
  totalPurchases?: number
  urls: string[];
  totalRevenue?: number
  totalClicks?: number
  costPerClick?: number
  approved: 'pending' | 'approved' | 'rejected' | 'posted' | 'influencer-approved' | 'pending-review' | 'declined' | 'processing'
  approvedBy: string | null;
  reason: string | null;
  caption: string;
  notes: string;
  engagementRate: number
  contentFormat?: ContentFormat
  campaign: Campaign
  postedAt: string
  permalink?: string
  isDeleted: boolean;
  conversionRate: number
  deletedAt: string | null;
  screenshotUrls?: string[]
  creator: User
  createdAt: string;
  post_due?: string,
  trackingUrl?: string,
  updatedAt: string;
  versions: ContentVersion[]
}

export type ContentFormat = 'post' | 'reel' | 'story'

export type ContentVersion = {
  contentId: string,
  version: string
}

export interface FilterContent {
  campaignIds: string[];
  influencerIds: string[];
  engagementRate: number[];
  conversionRate: string[];
  costPerClick: number[];
  revenue: number[];
  clicks: number[];
  purchases: number[];
}

export interface FilterContentPayload extends FilterContent {
  from: Dayjs | string;
  to: Dayjs | string;
}

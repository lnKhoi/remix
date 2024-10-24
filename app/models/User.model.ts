export type UserType = 'creator' | 'brand'

export type Auth = {
  email: string
  password: string
}

export type SignupPayload = {
  name?: string
  email?: string
  phone?: string
  industry?: string[]
  category?: string[]
  password?: string
  confirmPassword?: string
}

export type Brand = {
  id: string;
  name: string;
  phone: string;
  industry: string[];
  category: string[]
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
}

export type User = {
  id: string;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
  email: string;
  role: 'MANAGER' | 'CREATOR';
  picture: string | null;
  name: string;
  brand_id: string;
  brand: Brand;
  avatarUrl:string
}

export type GoogleAccount = {
  provider: string;
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: Array<{
    value: string;
  }>;
  photos: Array<{
    value: string;
  }>;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    hd: string;
  };
}

export type Creator = {
  id?:string,
  name?: string,
  age?:number,
  platform?: string,
  email?: string,
  country?: string,
  gender?:string,
  score?: number
  status?: 'active' | 'inactive' | 'not registered' | 'registered',
  followers?:number
  alreadyInvited?:boolean
}

export type InfluencerContentStatus = 'waiting_to_apply' | "accepted_invitation" | 'joined_campaign'

export type InfluencerInCampaign = {
  creator:Brand,
  campaignId:string,
  status: InfluencerContentStatus

}
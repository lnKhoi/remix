import { User } from './User.model';

export type Role = {
    name: string,
    description: string,
    users: string[] | User[],
    id:string,
    brandId:string,
    createdAt:string
    permissions: string[]
}

export type Permission = 'create-campaign' | 'view-campaign' | 'edit-campaign' | 'delete-campaign' | 'invite-imported-influencers'
export type Role = {
    name: string,
    description: string,
    users: string[],
    permissions: string[]
}

export type Permission = 'create-campaign' | 'view-campaign' | 'edit-campaign' | 'delete-campaign' | 'invite-imported-influencers'
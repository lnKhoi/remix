import {
  getData,
  postData,
} from './axiosClient';

export const getPermissions = () => {
    return getData(`/api/v1/role/permissions`)
}

export type CreateUserPayload = {
    name: string,
    email: string,
    roles: string[]
    avatarUrl?: string
}

export const createUserPermission = (user: CreateUserPayload) => {
    return postData(`/api/v1/role/register/brand-admin`, user)
}
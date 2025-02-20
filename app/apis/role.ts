import { Role } from '~/models/role.model';

import {
  getData,
  postData,
} from './axiosClient';

export const createRole = (payload: Role) => {
  return postData(`/api/v1/role/create-role`, payload)
}

export const getRoles = () => {
  return getData(`/api/v1/role/roles`)
}

export const getUsers = () => {
  return getData(`/api/v1/user/manager-list-for-brand`)
}

export const getRoleDetails = (id: string) => {
  return getData(`/api/v1/role/${id}/role-details`)
}
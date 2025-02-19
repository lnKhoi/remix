import { getData } from './axiosClient';

export const getPermissions = () => {
    return getData(`/api/v1/role/permissions`)
}
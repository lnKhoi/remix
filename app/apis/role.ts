import { Role } from '~/models/role.model';

import { postData } from './axiosClient';

export const createRole = (payload: Role) => {
    return postData(`/api/v1/role/create-role`, payload)
}

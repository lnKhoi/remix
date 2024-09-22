import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { getMe } from '~/apis/auth';
import { useAuthContext } from '~/contexts/auth.context';

export const useCheckAuth = () => {
    const navigate = useNavigate();
    const { updateUserInfo } = useAuthContext();

    const getUserInfo = async (): Promise<void> => {
        try {
            const res = await getMe();
            updateUserInfo(res.data);

            if (res.data?.role === 'MANAGER') {
                navigate('/manager/dashboard');
            } else {
                navigate('/creator/dashboard');
            }
        } catch (error) {
            updateUserInfo(null);
            navigate('/login');
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);
};

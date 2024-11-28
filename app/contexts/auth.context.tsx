import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { getMe } from '~/apis/auth';
import { User } from '~/models/User.model';

import { useNavigate } from '@remix-run/react';

type AuthContextType = {
    userInfo: User | null;
    updateUserInfo: (newValue: User | null) => void;
    handleLogout: () => void
    handleRefreshUserInfo: () => void
}
const MyContext = createContext<AuthContextType | undefined>(undefined);
type AuthContextProviderProps = { children: ReactNode }
const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const navigate = useNavigate()

    const updateUserInfo = (info: User | null) => {
        setUserInfo(info);
    };

    const handleLogout = (): void => {
        localStorage.removeItem('remix_us_tk')
        navigate('/logout')
    }

    const handleRefreshUserInfo = async (): Promise<void> => {
        await getMe().then((res) => {
            setUserInfo(res?.data);
        });
    };

    return (
        <MyContext.Provider value={{ userInfo, updateUserInfo, handleLogout, handleRefreshUserInfo }}>
            {children}
        </MyContext.Provider>
    );
};
const useAuthContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('AuthContext must be used within a AuthContextProvider');
    }
    return context;
};
export { AuthContextProvider, useAuthContext };
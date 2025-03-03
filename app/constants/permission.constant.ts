import { TabsProps } from 'antd';

export const UserTab: TabsProps['items'] = [
    {
        key: 'profile',
        label: 'Profile',
        children: null,
    },
    {
        key: 'role',
        label: 'Role',
        children: null,
    },
];


export const getColorStatusUser = (status: 'archive' | 'unarchive') => {
    switch (status) {
        case 'unarchive':
            return { background: '#CCFBF1', color: '#0F766E', status: 'Active' };
        case 'archive':
            return { background: '#FFEDD5', color: '#A16207', status: 'Archive' };
        default: null
    }
};

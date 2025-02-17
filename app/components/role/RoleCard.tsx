import React from 'react';

import { Button } from 'antd';

import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const RoleCard: React.FC = () => {
    return (
        <div className="p-4 border border-gray-200 rounded-xl shadow-sm w-full bg-white">
            {/* Role Title */}
            <h3 className="text-lg font-medium">Administrator</h3>

            {/* Created Date */}
            <div className="flex items-center text-gray-500 text-sm mt-1">
                <CalendarDaysIcon className="w-4 h-4 mr-1" />
                <span>Created Date: 12/01/2025</span>
            </div>

            {/* User Avatars */}
            <div className="flex items-center mt-3 space-x-[-8px]">
                <img
                    src="https://i.pravatar.cc/40?img=1"
                    alt="User 1"
                    className="w-9 h-9 rounded-full border-2 border-white"
                />
                <img
                    src="https://i.pravatar.cc/40?img=2"
                    alt="User 2"
                    className="w-9 h-9 rounded-full border-2 border-white"
                />
                <img
                    src="https://i.pravatar.cc/40?img=3"
                    alt="User 3"
                    className="w-9 h-9 rounded-full border-2 border-white"
                />
                <span className="w-9 h-9 flex items-center justify-center text-sm font-semibold bg-gray-200 rounded-full border-2 border-white">
                    +5
                </span>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-2">
                <Button className='w-[84px] bg-gray-100 border-none text-sm hover:bg-gray-200 font-semibold'>Edit</Button>
                <Button className='w-[101px] bg-gray-100 border-none text-sm font-semibold'>Delete Role</Button>

            </div>
        </div>
    );
};

export default RoleCard;

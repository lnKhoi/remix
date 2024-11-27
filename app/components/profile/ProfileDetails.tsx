import React, {
  FC,
  useState,
} from 'react';

import { Button } from 'antd';
import Avatar from '~/assets/avatar.jpeg';
import { useAuthContext } from '~/contexts/auth.context';

import { PencilSquareIcon } from '@heroicons/react/24/outline';

const ProfileDetails: FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const {userInfo} = useAuthContext()

    const initialData = {
        picture: "avatar.png",
        brandName: userInfo?.name,
        email: userInfo?.email,
        phoneNumber: userInfo?.brand.phone,
        industry: "Health care, Construction, Manufacturing",
        timezone: "UTC+0",
    };


    const [formData, setFormData] = useState(initialData);

    const handleCancel = () => {
        setFormData(initialData); // Reset changes
        setIsEditing(false);
    };

    const handleSave = () => {
        console.log("Saved Data:", formData);
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="w-full mx-auto bg-white py-5  rounded-2xl border border-gray-200">
            <div className='flex items-center px-8 pb-4 justify-between  border-b border-b-gray-200 '>
                <h2 className="text-lg font-semibold">Profile Information</h2>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} className='bg-gray-100 border border-gray-100 hover:border-gray-200'>
                        <PencilSquareIcon className='w-5 h-5 text-gray-800' /> Edit
                    </Button>
                )}
            </div>
            <div className="flex items-center px-8 mt-8 mb-6">
                <div className="w-[128px] h-[128px] rounded-full overflow-hidden">
                    <img src={Avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                {/* <div className="ml-4">
          <input
            type="file"
            className="text-sm text-gray-600"
            disabled={!isEditing}
          />
        </div> */}
            </div>
            <div className="space-y-4 px-8 pb-3">
                <div className='flex items-center'>
                    <label className="block text-sm w-[250px] text-gray-600">Brand Name</label>
                    <input
                        type="text"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg ${isEditing ? "border-gray-300 focus:border-blue-500" : "bg-gray-100"
                            }`}
                    />
                </div>

                <div className='flex items-center'>
                    <label className="block w-[250px] text-sm text-gray-600">Business Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg ${isEditing ? "border-gray-300 focus:border-blue-500" : "bg-gray-100"
                            }`}
                    />
                </div>

                <div className='flex items-center'>
                    <label className="block text-sm w-[250px] text-gray-600">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg ${isEditing ? "border-gray-300 focus:border-blue-500" : "bg-gray-100"
                            }`}
                    />
                </div>

                <div className='flex items-center'>
                    <label className="block text-sm w-[250px] text-gray-600">Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg ${isEditing ? "border-gray-300 focus:border-blue-500" : "bg-gray-100"
                            }`}
                    />
                </div>

                <div className='flex items-center'>
                    <label className="block text-sm w-[250px] text-gray-600">Timezone</label>
                    <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg ${isEditing ? "border-gray-300 focus:border-blue-500" : "bg-gray-100"
                            }`}
                    >
                        <option value="UTC+0">UTC+0</option>
                        <option value="UTC+1">UTC+1</option>
                        <option value="UTC-5">UTC-5</option>
                    </select>
                </div>
            </div>

            {isEditing && (
                <div className="flex justify-end mt-6 px-8 gap-3">
                    <button
                        onClick={handleCancel}
                        className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;

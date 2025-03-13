import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Form,
  Input,
  message,
  Select,
} from 'antd';
import { editProfile } from '~/apis/auth';
import { getRoles } from '~/apis/role';
import AvatarUser from '~/assets/avatar.jpeg';
import { useAuthContext } from '~/contexts/auth.context';
import useFileUpload from '~/hooks/useFileUpload';
import { Role } from '~/models/role.model';

import { PencilSquareIcon } from '@heroicons/react/24/outline';

import FileUploadTrigger from '../FileUploadTrigger';

const ProfileDetails: FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { userInfo, handleRefreshUserInfo } = useAuthContext();
    const [loading, setLoading] = useState<boolean>(false);
    const { fileUrl, uploadFile } = useFileUpload();
    const [form] = Form.useForm();
    const [roles,setRoles] = useState<Role[]>([])
    const {hasPermission} = useAuthContext()

    const [logo, setLogo] = useState<File | null>(null)

    const handleFileSelect = async (file: File) => {
        setLogo(file)
        await uploadFile(file);
    };

    const handleProfileSubmit = (values: any) => {
        setLoading(true);
        const sanitizedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value ?? ""])
        );

        editProfile({ ...sanitizedValues, logo: fileUrl ?? "default" })
            .then((res) => {
                // Handle success if needed
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => setLoading(false));
    };

    const handleGetRoles = () => {
        getRoles().then(res => setRoles(res.data.data))
    }

    useEffect(() => {
        handleGetRoles()
    },[])

    return (
        <div className="w-full mx-auto bg-white pfy-5 overflow-hidden rounded-2xl border border-gray-200">
            <div className="flex items-cente h-[60px] px-6 py-4 justify-between border-b border-b-gray-200">
                <h2 className="text-lg font-semibold">Profile Information</h2>
                {!isEditing && (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-gray-100 border border-gray-100 hover:border-gray-200"
                    >
                        <PencilSquareIcon className="w-5 h-5 text-gray-800" /> Edit
                    </Button>
                )}
            </div>

            {!isEditing && (
                <div className='flex m-6 flex-col gap-4'>
                    <div className='flex items-center'>
                        <span className='font-medium w-[250px] text-sm text-gray-500'>Avatar</span>
                        <img src={logo ? URL.createObjectURL(logo) : AvatarUser} alt="avatar" className='w-12 h-12 object-cover rounded-[50%]' />
                    </div>
                    <div className='flex'>
                        <span className='font-medium w-[250px] text-sm text-gray-500'>First Name</span>
                        <p className='font-medium text-sm text-gray-500'>Elysian Ben</p>
                    </div>
                    <div className='flex'>
                        <span className='font-medium w-[250px] text-sm text-gray-500'>Last Name</span>
                        <p className='font-medium text-sm text-gray-500'>khoilam.dev@gmail.com</p>
                    </div>
                    <div className='flex'>
                        <span className='font-medium w-[250px] text-sm text-gray-500'>Email</span>
                        <p className='font-medium text-sm text-gray-500'>--</p>
                    </div>
                    <div className='flex'>
                        <span className='font-medium w-[250px] text-sm text-gray-500'>Phone Number</span>
                        <p className='font-medium text-sm text-gray-500'>--</p>
                    </div>
                    <div className='flex'>
                        <span className='font-medium w-[250px] text-sm text-gray-500'>Role Name</span>
                        <p className='font-medium text-sm text-gray-500'>CTO</p>
                    </div>

                </div>
            )}

            {/* Edit Brand Information */}
            {isEditing && (
                <div className='-mx-1 mt-9'>
                    <Form
                        form={form}
                        labelCol={{ flex: '150px' }}
                        labelAlign="left"
                        labelWrap
                        onFinish={handleProfileSubmit}
                        wrapperCol={{ flex: 1 }}
                    >
                        <div className="pb-3 mx-8 ">
                            <div className='flex mb-5 items-center'>
                                <label className='w-[150px]'>Avatar</label>
                                <img src={logo ? URL.createObjectURL(logo) : AvatarUser} alt="avatar" className='w-12 h-12 object-cover rounded-[50%]' />
                                <FileUploadTrigger onFileSelect={handleFileSelect}>
                                    <Button className='ml-3 font-semibold'>Choose Picture</Button>
                                </FileUploadTrigger>
                            </div>
                            <Form.Item label="First Name" name="firstName"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="Last Name" name="lastName"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Email" name="email"> <Input /></Form.Item>
                            <Form.Item label="Phone Number" name="phoneNumber"><Input /></Form.Item>
                            <Form.Item label="Role Name" name="role">
                                <Select disabled={!hasPermission('edit-role')} maxTagCount={3} mode='multiple' >
                                    {roles?.map(r => (
                                    <Select.Option value={r?.id} key={r?.id} >{r?.name}</Select.Option>
                                    ))}
                                </Select>

                            </Form.Item>
                        </div>

                        <div className="flex justify-end mb-4 px-8 gap-3">
                            <Button type="default" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button
                                htmlType='submit'
                                disabled={loading}
                                type="primary"
                                loading={loading}
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;

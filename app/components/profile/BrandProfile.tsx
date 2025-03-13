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
import { ToastContainer } from 'react-toastify';
import {
  editContactPoint,
  editProfile,
} from '~/apis/auth';
import AvatarUser from '~/assets/avatar.jpeg';
import { INDUSTRIES } from '~/constants/auth.constant';
import { useAuthContext } from '~/contexts/auth.context';
import useFileUpload from '~/hooks/useFileUpload';
import { Brand } from '~/models/User.model';

import { PencilSquareIcon } from '@heroicons/react/24/outline';

import FileUploadTrigger from '../FileUploadTrigger';

const { Option } = Select;

const BrandProfile: FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editContact, setEditContact] = useState<boolean>(false)
    const { userInfo, handleRefreshUserInfo, isLoading } = useAuthContext();
    const [loading, setLoading] = useState<boolean>(false);
    const { fileUrl, uploadFile } = useFileUpload();
    const [form] = Form.useForm();
    const [logo, setLogo] = useState<File | null | string>(null)

    const handleFileSelect = async (file: File) => {
        setLogo(file)
        await uploadFile(file);
    };

    const handleProfileSubmit = (values: Brand) => {
        setLoading(true);
        const sanitizedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value ?? ""])
        );

        editProfile({ ...sanitizedValues, logoUrl: fileUrl || logo as string })
            .then((res) => {
                handleRefreshUserInfo()
                message.success('Update Successfully!')
                setIsEditing(false)
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => setLoading(false));
    };

    const handleContactSubmit = (values: Brand) => {
        setLoading(true);
        const sanitizedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value ?? ""])
        );

        editContactPoint(sanitizedValues)
            .then((res) => {
                handleRefreshUserInfo()
                message.success('Update Successfully!')
                setEditContact(false)
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        form.setFieldsValue(userInfo?.brand)
        setLogo(userInfo?.brand?.logoUrl as string)
    }, [userInfo])

    return (
        <div className='flex -mt-6 flex-col gap-6'>
            {/* Brand Infomation */}
            <ToastContainer />
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
                            <span className='font-medium w-[250px] text-sm text-gray-500'>Logo</span>
                            <img
                                src={typeof logo == 'string' ? logo : logo ? URL.createObjectURL(logo) : AvatarUser}
                                alt="logo"
                                className='w-12 h-12 object-cover rounded-[50%]' />
                        </div>
                        <div className='flex'>
                            <span className='font-medium w-[250px] text-sm text-gray-500'>Brand Name</span>
                            <p className='font-medium text-sm text-gray-500'>{userInfo?.brand?.name}</p>
                        </div>
                        <div className='flex'>
                            <span className='font-medium w-[250px] text-sm text-gray-500'>Business Email</span>
                            <p className='font-medium text-sm text-gray-500'>{userInfo?.brand?.businessEmail}</p>
                        </div>
                        <div className='flex'>
                            <span className='font-medium w-[250px] text-sm text-gray-500'>Industry</span>
                            <p className='font-medium text-sm text-gray-500 capitalize'>
                                {Array.isArray(userInfo?.brand?.industry) ? userInfo?.brand?.industry.map(e => e).join(', ') : '--'}
                            </p>
                        </div>
                        <div className='flex'>
                            <span className='font-medium w-[250px] text-sm text-gray-500'>Address</span>
                            <p className='font-medium text-sm text-gray-500'>{userInfo?.brand?.address || '--'}</p>
                        </div>
                        <div className='flex'>
                            <span className='font-medium w-[250px] text-sm text-gray-500'>Website</span>
                            <p className='font-medium text-sm text-gray-500'>{userInfo?.brand?.websiteUrl || '--'}</p>
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
                                    <label className='w-[150px]'>Logo</label>
                                    <img src={typeof logo == 'string' ? logo : logo ? URL.createObjectURL(logo) : AvatarUser} alt="logo" className='w-12 h-12 object-cover rounded-[50%]' />
                                    <FileUploadTrigger onFileSelect={handleFileSelect}>
                                        <Button className='ml-3 font-semibold'>Choose Picture</Button>
                                    </FileUploadTrigger>
                                </div>
                                <Form.Item label="Brand Name" name="name"
                                    rules={[{ required: true, message: "Please enter your Brand Name" }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Business Email" name="businessEmail"
                                    rules={[{ required: true, message: "Please enter your Business Email" }]}
                                >
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item label="Industry" name="industry"
                                    rules={[{ required: true, message: "Please enter your Industry" },]}
                                >
                                    <Select mode='multiple' >
                                        {INDUSTRIES.map(i => (
                                            <Select.Option key={i.value} value={i.value} >{i.label}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Address" name="address"><Input /></Form.Item>
                                <Form.Item label="Website" name="websiteUrl"><Input /></Form.Item>
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
            {/* Contact point */}
            <div className="w-full mx-auto bg-white pfy-5 overflow-hidden rounded-2xl border border-gray-200">

                <div className="flex items-cente h-[60px] px-6 py-4 justify-between border-b border-b-gray-200">
                    <h2 className="text-lg font-semibold">Contact Point</h2>
                    {!editContact && (
                        <Button
                            onClick={() => setEditContact(true)}
                            className="bg-gray-100 border border-gray-100 hover:border-gray-200"
                        >
                            <PencilSquareIcon className="w-5 h-5 text-gray-800" /> Edit
                        </Button>
                    )}
                </div>

                {!editContact && (
                    <div className='flex m-6 flex-col gap-4'>
                        <div className='flex'>
                            <span className='font-medium w-[250px] text-sm text-gray-500'>Title</span>
                            <p className='font-medium text-sm text-gray-500'>{userInfo?.brand?.contactPointTitle}</p>
                        </div>
                        <div className='flex'>
                            <span className='font-medium w-[250px] text-sm text-gray-500'>First Name</span>
                            <p className='font-medium text-sm text-gray-500'>{userInfo?.brand?.contactPointFirstName}</p>
                        </div>
                        <div className='flex'>
                            <span className='font-medium w-[250px] text-sm text-gray-500'>Last Name</span>
                            <p className='font-medium text-sm text-gray-500'>{userInfo?.brand?.contactPointLastName}</p>
                        </div>
                        <div className='flex'>
                            <span className='font-medium w-[250px] text-sm text-gray-500'>Personal Email</span>
                            <p className='font-medium text-sm text-gray-500'>{userInfo?.brand?.contactPointEmail}</p>
                        </div>
                    </div>
                )}

                {/* Edit Brand Information */}
                {editContact && (
                    <div className='-mx-1 mt-9'>
                        <Form
                            form={form}
                            labelCol={{ flex: '150px' }}
                            labelAlign="left"
                            onFinish={handleContactSubmit}
                            labelWrap
                            wrapperCol={{ flex: 1 }}
                        >
                            <div className="pb-3 mx-8 ">
                                <Form.Item label="Title" name="contactPointTitle"><Input placeholder='Enter title' /></Form.Item>
                                <Form.Item label="First Name" name="contactPointFirstName"><Input placeholder='Enter first name' /></Form.Item>
                                <Form.Item label="Last Name" name="contactPointLastName"><Input placeholder='Enter last name' /></Form.Item>
                                <Form.Item label="Personal Email" name="contactPointEmail"><Input placeholder='Enter email' /></Form.Item>
                            </div>

                            <div className="flex justify-end mb-4 px-8 gap-3">
                                <Button type="default" onClick={() => setEditContact(false)}>
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
        </div>
    );
};

export default BrandProfile;

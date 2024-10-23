import React from 'react';

import { Drawer } from 'antd';
import { HeartIcon } from 'lucide-react';
import FB from '~/assets/facebook.svg';
import IG from '~/assets/insta.svg';
import P1 from '~/assets/p1.png';
import TT from '~/assets/tiktok.svg';
import Avatar from '~/assets/user-avatar.png';
import { socials } from '~/constants/creator.constant';

import {
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { EnvelopeOpenIcon } from '@radix-ui/react-icons';

import PieChart from '../custom/charts/Piechart';

type ModalViewInfluencerProfileProps = {
    open: boolean
    onClose: () => void
}
function ModalViewInfluencerProfile({ onClose, open }: ModalViewInfluencerProfileProps) {

    const pieData = [
        { name: 'Woman', y: 61.41 },
        { name: 'Men', y: 11.84 },
    ];

    return (
        <Drawer
            placement="right"
            width={992}
            headerStyle={{ display: 'none' }}
            bodyStyle={{ padding: 0, margin: 0, height: '100vh', overflowY: 'scroll' }}
            contentWrapperStyle={{ paddingTop: 0 }}
            onClose={() => onClose()}
            open={open}
        >

            <div className='w-full min-h-screen flex-1'>
                <div className="bg-gradient-to-r from-rose-100 via-rose-100/60 to-teal-100 h-[114px] relative">
                    <div onClick={() => onClose()} className='w-[28px] h-[28px] absolute cursor-pointer left-5 top-4 border rounded-lg flex items-center justify-center'>
                        <XMarkIcon className='w-5 h-5 text-gray-800' />
                    </div>
                </div>
                <div className="min-h-screen  -mt-[54px] ">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r mx-auto  z-30 rounded-xl px-6">
                        <div className="flex items-center gap-5">
                            <img
                                src={Avatar}
                                alt="Profile"
                                className="w-[108px] transform translate-y-0.5 h-[108px] rounded-full object-cover"
                            />
                            <div className='transform translate-y-8'>
                                <h1 className="text-2xl font-semibold">Welcome, Harna</h1>
                                <div className='flex items-center gap-1'>
                                    <EnvelopeOpenIcon className='text-gray-500 w-3 h-3' />
                                    <p className="text-gray-500 text-sm">youremail@gmail.com</p>
                                </div>
                            </div>
                            <div className="ml-auto pr-1 mt-12 flex items-center space-x-2">
                                <img src={IG} alt="IG" />
                                <img src={FB} alt="FB" />
                                <img src={TT} alt="TT" />
                            </div>
                        </div>

                        {/* Biographic and Expertise Section */}
                        <div className="grid grid-cols-2 gap-6 mt-12">
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Biographic</h2>
                                <div className="text-gray-500 py-2 text-xs rounded-lg bg-gray-100 text-justify px-3 ">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry’s standard dummy text
                                    ever since the 1500s.
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Expertise</h2>
                                <div className="flex flex-wrap gap-2">
                                    {["Food & Beverage", "Travel", "Lifestyle"].map((item) => (
                                        <span
                                            key={item}
                                            className="bg-gray-100 text-sm px-3 py-1 rounded-md"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Social Media Stats */}
                        <h2 className="text-lg font-semibold mt-10">Social Media</h2>
                        <div className="grid grid-cols-3 gap-4 mt-5">
                            {socials.slice(1,2).map((platform) => (
                                <div
                                    key={platform.name}
                                    className="bg-gray-100 p-6 h-[128px] rounded-lg shadow flex flex-col gap-4 items-start"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className='flex items-center justify-center w-8 h-8 rounded-lg shadow-md bg-white'>
                                            <img src={platform.icon} alt="" />
                                        </div>
                                        <p className='text-xs text-gray-800 capitalize'>{platform.name}</p>
                                    </div>
                                    <div className='flex items-start  w-full gap-8'>
                                        <div className='flex flex-col items-start'>
                                            <p className="text-gray-800 text-sm font-semibold">1.5M</p>
                                            <span className='text-xs font-normal text-gray-500'>Followers</span>
                                        </div>
                                        <div className='flex flex-col items-start'>
                                            <p className="text-gray-800 text-sm font-semibold">230</p>
                                            <span className='text-xs font-normal text-gray-500'>Posts</span>
                                        </div>
                                        <div className='flex flex-col items-start'>
                                            <p className="text-gray-800 text-sm font-semibold">145k</p>
                                            <span className='text-xs font-normal text-gray-500'>Likes</span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Audience Demographics */}
                        <h2 className="text-lg font-semibold mt-10">Audience Demographic</h2>
                        <div className="grid grid-cols-3 gap-8 mt-5">
                            {/* Age Range */}
                            <div>
                                <h3 className="text-sm text-gray-800 font-medium  mb-4">Age Range</h3>
                                {[
                                    { range: "12-17", value: 24.6 },
                                    { range: "18-24", value: 48.2 },
                                    { range: "25-34", value: 69.9 },
                                    { range: "35-44", value: 20.9 },
                                    { range: "45-54", value: 36.9 },
                                ].map(({ range, value }) => (
                                    <div key={range} className="flex gap-3 items-center justify-between mb-2">
                                        <span className='max-w-[45px] min-w-[45px] text-xs text-gray-500 text-end'>{range}</span>
                                        <div className="min-w-[177px] bg-gray-200 h-4 rounded-md">
                                            <div
                                                className="bg-blue-500 h-4 rounded-full"
                                                style={{ width: `${value}%` }}
                                            ></div>
                                        </div>
                                        <span className='text-xs text-gray-500'>{value}%</span>
                                    </div>
                                ))}
                            </div>

                            {/* Location */}
                            <div>
                                <h3 className="text-sm text-gray-800 font-medium  mb-4">Location</h3>
                                {[
                                    { country: "United States", value: 76.9 },
                                    { country: "India", value: 5.0 },
                                    { country: "United Kingdom", value: 4.7 },
                                    { country: "Canada", value: 2.5 },
                                    { country: "Australia", value: 1.1 },
                                ].map(({ country, value }) => (
                                    <div key={country} className="flex gap-3 items-center justify-between mb-2">
                                        <span className='max-w-[95px] text-xs text-gray-500 min-w-[95px] text-end'>{country}</span>
                                        <div className="min-w-[177px] bg-gray-200 h-4 rounded-md">
                                            <div
                                                className="bg-blue-500 h-4 rounded-full"
                                                style={{ width: `${value}%` }}
                                            ></div>
                                        </div>
                                        <span className='text-xs text-gray-500'>{value}%</span>
                                    </div>
                                ))}
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col items-start justify-center pl-12 w-full">
                                <h3 className="text-sm text-gray-800 font-medium ">Gender</h3>
                                <div className='w-full flex items-center justify-center'>
                                    <PieChart data={pieData as any} />
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Section */}
                        <div className="mt-8 mb-12">
                            <h3 className="text-lg font-semibold mb-4">Portfolio</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="relative">
                                        <img
                                            src={P1}
                                            alt={`Portfolio ${item}`}
                                            className="rounded-lg w-[293px] h-[293px] object-cover"
                                        />
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <div className='flex items-center gap-1'>
                                                    <HeartIcon width={18} height={18} className='text-gray-500' />
                                                    <span className='text-sm font-medium text-gray-800'> 2M</span>
                                                </div>
                                                <div className='flex items-center gap-1'>
                                                    <ChatBubbleOvalLeftIcon width={18} height={18} className='text-gray-500' />
                                                    <span className='text-sm font-medium text-gray-800'> 3K</span>
                                                </div>
                                                <div className='flex items-center gap-1'>
                                                    <PaperAirplaneIcon width={18} height={18} className='text-gray-500' />
                                                    <span className='text-sm font-medium text-gray-800'> 69</span>
                                                </div>
                                            </div>
                                            <button className="bg-gray-100 text-gray-800 text-sm font-semibold px-4 py-1 rounded-md">
                                                Visit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </Drawer>
    )
}

export default ModalViewInfluencerProfile

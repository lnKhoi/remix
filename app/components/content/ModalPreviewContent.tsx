import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';

import { Drawer } from 'antd';
//@ts-ignore
import Slider from 'react-slick';
import { Content } from '~/models/Content.model';
import { abbreviateLastName } from '~/utils/formatNumber';

import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  MusicalNoteIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

type ModalPreviewContentProps = {
    open: boolean,
    onClose: () => void
    content: Content
}

function ModalPreviewContent({ onClose, open, content }: ModalPreviewContentProps) {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Drawer
            width={600}
            title="Preview"
            open={open}
            onClose={onClose}
        >
            {/* POST */}
            {content?.campaign?.contentFormat?.[0] === 'post' && (
                <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-md shadow-md">
                    {/* Header */}
                    <div className="flex items-center p-3">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={content?.creator?.avatarUrl}
                            alt="Profile"
                        />
                        <div className="ml-3 pb-2">
                            <p className="font-semibold">{content?.creator?.name}</p>
                        </div>
                    </div>

                    {/* Image */}
                    <Slider {...settings}>
                        {content?.urls?.map(url => (
                            <img
                                src={url}
                                alt="Post"
                                className="w-[393px] h-[393px] object-cover"
                            />
                        ))}
                    </Slider>

                    {/* Actions */}
                    <div className="flex items-center justify-between px-4 py-2">
                        <div className="flex items-center space-x-3">
                            <HeartIcon className='w-[23px] h-[23px]' />
                            <ChatBubbleOvalLeftIcon className='w-[23px] h-[23px]' />
                            <PaperAirplaneIcon className='w-[23px] -rotate-[45deg] h-[23px] transform -translate-y-[2px]' />
                        </div>
                        <BookmarkIcon className='w-[23px] h-[23px]' />
                    </div>

                    {/* Likes */}
                    <div className="px-4">
                        <p className="font-semibold">247 likes</p>
                    </div>

                    {/* Caption */}
                    <div className="px-4 py-2">
                        <p>
                            <span className="font-semibold">{content?.creator?.name}</span>
                            {abbreviateLastName(content?.caption, 40)}
                        </p>
                    </div>

                    {/* Time */}
                    <div className="px-4 pb-4 text-sm text-gray-500">10 minutes ago</div>
                </div>
            )}

            {/* REEL */}
            {content?.campaign?.contentFormat?.[0] === 'reel' && (
                <div className="max-w-sm mx-auto relative bg-white border border-gray-200 rounded-md shadow-md">
                    {/* Profile Section */}
                    <div className="flex items-center p-3 absolute left-0 bottom-16 ">
                        <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={content?.creator?.avatarUrl}
                            alt="Profile"
                        />
                        <div className="ml-3  flex-1">
                            <p className="font-semibold text-white">{content?.creator?.name}</p>

                        </div>
                    </div>

                    {/* Image Slider */}
                    <video
                        autoPlay
                        loop
                        muted
                        src={content?.urls?.[0]}
                        className="w-[393px] h-[550px] object-cover"
                    />
                    {/* Action Buttons */}
                    <div className="flex flex-col absolute right-0 bottom-[10%] items-center justify-between px-4 py-2">
                        <div className="flex items-center flex-col gap-4">
                            <div className='flex flex-col items-center'>
                                <HeartIcon className="w-6 h-6 text-white" />
                                <p className='text-white'>24</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <ChatBubbleOvalLeftIcon className="w-6 h-6 text-white" />
                                <p className='text-white'>200</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <PaperAirplaneIcon className="w-6 h-6 text-white transform" />
                                <p className='text-white'>2</p>
                            </div>
                        </div>
                    </div>

                    {/* Caption */}
                    <div className="px-4 absolute bottom-0 flex flex-col items-start left-0 py-2">
                        <p className='text-gray-100'>
                            {abbreviateLastName(content?.caption, 40)}
                        </p>
                        {/* Song Section */}
                        <div className="py-2 flex items-center gap-1">
                            <MusicalNoteIcon className='w-4 h-4 text-white' />
                            <p className="text-sm text-gray-100">song name · Original audio</p>
                        </div>
                    </div>

                </div>
            )}

        </Drawer>
    )
}

export default ModalPreviewContent

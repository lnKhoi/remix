import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useState } from 'react';

// @ts-ignore
import Slider from 'react-slick';
import DefaultAvatar from '~/assets/avatar.jpeg';
import { API_URL } from '~/constants/env.constant';
import { Content } from '~/models/Content.model';
import {
  abbreviateLastName,
  formatName,
  getContentUrlDownload,
} from '~/utils/formatNumber';

import {
  ArrowDownTrayIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

// Component Props
interface ModalPreviewContentProps {
    content: Content;
}

// Slider Configuration
const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots custom-dots',
    customPaging: (i: number) => (
        <button>
            <div className="w-2 h-2 bg-gray-400 rounded-full transition-all duration-300 hover:bg-gray-600" />
        </button>
    ),
};

// Download Button Component
const DownloadButton: React.FC<{ url: string }> = ({ url }) => (
    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-gray-600 cursor-pointer">
        <a
            href={`${API_URL}/api/v1/content/media/${getContentUrlDownload(url)}?action=download`}
            download="media-content"
            target="_blank"
            rel="noopener noreferrer"
        >
            <ArrowDownTrayIcon className="w-5 h-5 text-white" />
        </a>
    </div>
);

// Caption Component
const Caption: React.FC<{ caption: string | undefined; isExpanded: boolean; toggleExpand: () => void }> = ({
    caption,
    isExpanded,
    toggleExpand,
}) => (
    <p className="flex flex-col gap-1">
        <p className="flex w-full items-center gap-2">
            <span className="break-all">
                {isExpanded ? caption : abbreviateLastName(caption as string, 60)}
                {caption?.length || 0 > 60 && (
                    <span
                        onClick={toggleExpand}
                        className="text-gray-500 cursor-pointer hover:underline"
                    >
                        {isExpanded ? ' less' : ' more'}
                    </span>
                )}
            </span>
        </p>
    </p>
);

const ModalPreviewContent: React.FC<ModalPreviewContentProps> = ({ content }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentFormat = content?.campaign?.contentFormat?.[0];
    const videoExtensions = ['mov', 'mp4'];
    const isVideo = content?.urls?.[0]?.slice(-3) && videoExtensions.includes(content.urls[0].slice(-3));

    const toggleExpand = () => setIsExpanded(prev => !prev);
    const isPostedContent = content?.approved =='posted' || content?.approved =='approved' || content?.approved =='processing'

    // Profile Header Component
    const ProfileHeader: React.FC<{ name: string; avatarUrl?: string }> = ({ name, avatarUrl }) => (
        <div className="flex items-center">
            <img
                className="w-10 h-10 rounded-full object-cover"
                src={avatarUrl || DefaultAvatar}
                alt="Profile"
            />
            <div className="ml-3 pb-2">
                <p className="font-semibold text-white">{formatName(name)}</p>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            {/* POST */}
            {contentFormat === 'post' && (
                <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="flex items-center p-3">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={content?.creator?.avatarUrl || DefaultAvatar}
                            alt="Profile"
                        />
                        <div className="ml-3 pb-2">
                            <p className="font-semibold">{formatName(content?.creator?.name as string)}</p>
                        </div>
                    </div>

                    <div className="relative">
                        <Slider {...sliderSettings}>
                            {content?.urls?.map((url, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={url}
                                        alt={`Post ${index}`}
                                        className="w-[393px] h-[353px] object-cover"
                                    />
                                    <div className="absolute bottom-[310px] right-2 z-20">
                                       {isPostedContent && <DownloadButton url={url} />}  
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2">
                        <div className="flex items-center space-x-3">
                            <HeartIcon className="w-[23px] h-[23px]" />
                            <ChatBubbleOvalLeftIcon className="w-[23px] h-[23px]" />
                            <PaperAirplaneIcon className="w-[23px] h-[23px] -rotate-[45deg] transform -translate-y-[2px]" />
                        </div>
                        <BookmarkIcon className="w-[23px] h-[23px]" />
                    </div>

                    <div className="px-4 py-2 mb-3">
                        <Caption caption={content?.caption} isExpanded={isExpanded} toggleExpand={toggleExpand} />
                    </div>
                </div>
            )}

            {/* REEL */}
            {contentFormat === 'reel' && (
                <div className="max-w-sm mx-auto relative bg-white border border-gray-200 rounded-md shadow-md">
                    <div className="relative rounded-lg w-[393px] h-[590px] overflow-hidden">
                        <div className="flex items-center p-3 absolute z-20 left-0 bottom-20">
                            <ProfileHeader name={content?.creator?.name as string} avatarUrl={content?.creator?.avatarUrl} />
                        </div>

                        <video
                            autoPlay
                            controlsList="nodownload" 
                            loop
                            controls
                            muted
                            src={content?.urls?.[0]}
                            className="w-full h-full object-cover relative z-10"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0" />
                        <div className="absolute right-0 top-2 z-20">
                        {isPostedContent &&  <DownloadButton url={content?.urls?.[0] || ''} />}  
                        </div>
                    </div>

                    <p className="flex absolute bottom-16 left-3 z-20 text-gray-100 w-full">
                        <Caption caption={content?.caption} isExpanded={isExpanded} toggleExpand={toggleExpand} />
                    </p>
                </div>
            )}

            {/* STORY */}
            {contentFormat === 'story' && (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[360px] rounded-xl overflow-hidden shadow-md relative h-[590px]">
                        {isVideo ? (
                            <video
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                src={content?.urls?.[0]}
                                autoPlay
                                muted
                                controlsList="nodownload" 
                                loop
                            />
                        ) : (
                            <div
                                style={{
                                    backgroundImage: `url(${content?.urls?.[0]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                                className="absolute top-0 left-0"
                            />
                        )}

                        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.25)]" />
                        <div className="flex absolute top-1 left-0 w-full justify-between items-center p-3 bg-[rgba(0,0,0,0.03)]">
                            <ProfileHeader name={content?.creator?.name as string} avatarUrl={content?.creator?.avatarUrl} />
                            <div className="z-20">
                            {isPostedContent &&  <DownloadButton url={content?.urls?.[0] || ''} />}  
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalPreviewContent;
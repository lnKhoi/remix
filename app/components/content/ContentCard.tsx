import React from 'react';

import {
  Button,
  message,
} from 'antd';
import dayjs from 'dayjs';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DATE_TIME_FORMAT } from '~/constants/time.constant';
import {
  ContentStatus,
  getColorStatusContent,
} from '~/helpers/campaign.helper';
import { Content } from '~/models/Content.model';
import { abbreviateLastName } from '~/utils/formatNumber';

import { LinkIcon } from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';

type ContentCardProps = {
    content: Content
}

function ContentCard({ content }: ContentCardProps) {
    const [messageApi, contextHolder] = message.useMessage();

    const videoExtensions = ['mov', 'mp4'];
    const isVideo = content?.urls?.[0] ? videoExtensions.includes(content.urls[0].slice(-3)) : false;


    const defaultAvatar = 'https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg'

    return (
        <div className='rounded-2xl cursor-pointer border border-gray-200 hover:shadow-md transition-shadow'>
            {contextHolder}
            {isVideo
                ? <video
                    autoPlay
                    loop
                    muted className='2xl:h-[400px] xl:h-[280px] lg:h-[240px] rounded-t-2xl w-full object-cover' src={content?.urls?.[0]}></video>
                : <img className='2xl:h-[400px] xl:h-[280px] lg:h-[240px] rounded-t-2xl w-full object-cover'
                    src={content?.urls?.[0]} alt="content preview" />
            }
            <div className='pt-4 px-4 pb-2 flex flex-col justify-around h-[230px]'>
                <div className='flex items-center gap-3'>
                    <img className='w-[36px] rounded-[50%] h-[36px] object-cover'
                        src={content?.creator?.avatarUrl || defaultAvatar} alt="avatar" />
                    <div className='flex flex-col'>
                        <h6 className='text-sm text-gray-800'>{content?.creator?.name}</h6>
                        <p className='text-sm text-gray-500 '>{content.creator.email}</p>
                    </div>
                </div>
                <p className='text-gray-500 mt-2 text-sm leading-5 '>
                 {abbreviateLastName(content.caption,200)}
                </p>
                <div className='h-[28px] rounded-lg bg-blue-100 text-xs text-blue-700 w-[158px]  items-center justify-center flex'>
                    Create date: {dayjs(content.createdAt).format(DATE_TIME_FORMAT)}
                </div>
                <div className='flex items-center justify-between'>
                    <div style={{ backgroundColor: getColorStatusContent(content?.approved as ContentStatus)?.background }}
                        className={`inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px]`}>
                        <div style={{ backgroundColor: getColorStatusContent(content?.approved as ContentStatus)?.color }}
                            className={`w-2 h-2 rounded-[50%]`}></div>
                        <span style={{ color: getColorStatusContent(content?.approved as ContentStatus)?.color }} className='text-[12px] capitalize '>
                            {getColorStatusContent(content?.approved as ContentStatus)?.status}
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        {(content.approved === 'posted') && (
                            <CopyToClipboard
                                onCopy={() => messageApi.success('Copied to clipboard!')}
                                text={content.trackingUrl || ''}
                            >
                                <div className='h-[30px] w-[30px] cursor-pointer rounded-md bg-gray-200 flex items-center justify-center'>
                                    <LinkIcon width={16} className='text-gray-500' />
                                </div>
                            </CopyToClipboard>
                        )}
                        <Link to={`/manager/content/${content.id}`}>
                            <Button className='bg-gray-100' type='text' >View content</Button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContentCard

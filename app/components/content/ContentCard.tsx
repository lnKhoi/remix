import React, {
  useEffect,
  useState,
} from 'react';

import { Button } from 'antd';
import { getMediaContentInCampaign } from '~/apis/campaign';
import {
  ContentStatus,
  getColorStatusContent,
} from '~/helpers/campaign.helper';
import { Content } from '~/models/Content.model';

import { Link } from '@remix-run/react';

type ContentCardProps = {
    content: Content
}
function ContentCard({ content }: ContentCardProps) {
    const [image,setImage] = useState()
    const handleGetMedia = async () => {
        await getMediaContentInCampaign(content.campaignId, content.url).then((res) => {
           
        })
    }

    useEffect(() => {
        // handleGetMedia()
    }, [])

    // console.log(image)

    return (
        <div className='rounded-2xl cursor-pointer border border-gray-200 hover:shadow-md transition-shadow'>
            {/* <MediaDisplay campaignId={content.campaignId} filename={content.url} /> */}
            <img className='2xl:h-[400px] xl:h-[280px] lg:h-[240px] rounded-t-2xl w-full object-cover' src={'https://cdn.sanity.io/images/d2mgkh8z/production/0c631faedcef755c01d1c8082e044ce7488018e6-4000x2244.jpg?w=1000'} alt="content preview" />
            <div className='p-4'>
                <div className='flex items-center gap-3'>
                    <img className='w-[36px] rounded-[50%] h-[36px] object-cover' src={'https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg'} alt="avatar" />
                    <div className='flex flex-col'>
                        <h6 className='text-sm text-gray-800'>{content?.creator?.name}</h6>
                        <p className='text-sm text-gray-500 '>khoilam.dev@gmail.com</p>
                    </div>
                </div>
                <p className='text-gray-500 mt-2 text-sm leading-5'>{content?.caption}</p>
                <div className='flex items-center justify-between mt-6'>
                    <div style={{ backgroundColor: getColorStatusContent(content?.approved as ContentStatus)?.background }}
                        className={`inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px]`}>
                        <div style={{ backgroundColor: getColorStatusContent(content?.approved as ContentStatus)?.color }}
                            className={`w-2 h-2 rounded-[50%]`}></div>
                        <span style={{ color: getColorStatusContent(content?.approved as ContentStatus)?.color }} className='text-[12px] capitalize '>{getColorStatusContent(content?.approved as ContentStatus)?.status }</span>
                    </div>
                    <Link to={`/manager/content/${content.id}`}>
                        <Button className='bg-gray-100' type='text' >View content</Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default ContentCard

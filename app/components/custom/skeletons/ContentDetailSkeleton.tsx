import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

import React, {
    useEffect,
    useState,
} from 'react';

import {
    Breadcrumb,
    Button,
    DatePicker,
    Drawer,
    Input,
    message,
    Modal,
    Select,
    Skeleton,
    TimePicker,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
    toast,
    ToastContainer,
} from 'react-toastify';
import {
    getContentDetails,
    reviewContent,
} from '~/apis/campaign';
import {
    approveContent,
    publishContent,
} from '~/apis/content';
import Approve from '~/assets/approve.png';
import Reject from '~/assets/reject.png';
import EmbedContent from '~/components/content/EmbedContent';
import ModalPreviewContent from '~/components/content/ModalPreviewContent';
import TagColor from '~/components/ui/tagColor';
import {
    DATE_TIME_FORMAT,
    DATE_TIME_FORMAT_V2,
} from '~/constants/time.constant';
import {
    ContentStatus,
    getColorStatusContent,
} from '~/helpers/campaign.helper';
import { Content } from '~/models/Content.model';
import Editor from '~/plugins/editor';
import {
    abbreviateLastName,
    formatName,
} from '~/utils/formatNumber';

import {
    CalendarDateRangeIcon,
    DocumentDuplicateIcon,
    ExclamationCircleIcon,
    LinkIcon,
    Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import { MetaFunction } from '@remix-run/cloudflare';
import {
    useNavigate,
    useParams,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [{ title: 'Review Content' }]
}

const { TextArea } = Input
type ModalType = 'confirm-posting-date' | 'reject-influencer-request' | 'approve-influencer-request' | 'reject-content' | ''

function ContentDetailSkeleton() {
    return (
        <div className='mx-auto w-full mt-16 justify-center flex items-start gap-7'>
            <div>
                <div className='w-[700px] border border-gray-200 shadow-sm rounded-xl '>
                    <div className='flex border-b border-b-gray-200 items-center justify-between'>
                        <div className='flex items-center p-4 gap-2'>
                            <Skeleton.Button active style={{ height: 25, width: 100, marginLeft: 20, }} />
                        </div>
                        <div className='flex p-4 items-center justify-between gap-3'>
                            <Skeleton.Button active style={{ height: 25, width: 160, marginLeft: 20, padding: 3 }} />
                        </div>
                    </div>
                    <div className='flex p-4 items-start mt-1 gap-3'>

                        <Skeleton.Avatar active shape='circle' style={{ width: 36, height: 36 }} />
                        <div className='flex flex-col items-start'>
                            <Skeleton.Button active style={{ width: 80, height: 20 }} />
                            <Skeleton.Button active style={{ width: 200, height: 18 }} />
                        </div>
                    </div>
                    <div className='px-4 pt-2 pb-4'>
                        <div className='flex items-center gap-2'>
                            <Skeleton.Image active style={{ width: 120, height: 120, borderRadius: 8, }} />
                        </div>
                        <Skeleton.Button active style={{ width: 320, height: 16, marginTop: 16 }} />
                    </div>
                </div>

                {/* Note */}
                <div className='w-[700px] border border-gray-200 shadow-sm rounded-xl mt-5 p-5'>
                    <Skeleton.Button active style={{ height: 20 }} />
                    <div className='text-justify rounded-xl mt-2'>
                        <Skeleton.Button block active style={{ height: 30 }} />
                    </div>
                </div>
            </div>

            {/* Review */}
            <div className='flex flex-col gap-5 w-[400px]'>
                {/* Influencer Requested */}
                <div className='flex flex-col gap-5 w-full'>
                    <div className='flex flex-col gap-5 w-full border border-gray-100 rounded-xl'>
                        <Skeleton.Node active style={{ marginTop: 16, marginLeft: 16, marginRight: 16, width: '90%', height: 60 }} />
                        <div className='w-full justify-between px-4 flex items-center '>
                            <Skeleton.Button active style={{ height: 28, borderRadius: 50 }} />
                            <Skeleton.Button active style={{ height: 28 }} />
                        </div>
                        <Skeleton.Node active style={{ width: '100%', height: 70 }} />
                    </div>
                </div>

                {/* Link website */}
                <div className='w-full border border-gray-100 rounded-xl shadow-sm'>
                    <div className='flex items-start p-4 gap-3'>
                        <div className='flex flex-col gap-1 w-full'>
                            <Skeleton.Button active style={{ width: 100, height: 16 }} />
                            <Skeleton.Button active style={{ width: 200, height: 16 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentDetailSkeleton

import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  Dropdown,
  Menu,
  Modal,
} from 'antd';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { deleteCampaign } from '~/apis/campaign';
import { campaignMenuItems } from '~/constants/manager.constant';
import {
  DELETE_CAMPAGIN_SUCCESS,
  DELETE_CAMPAIGN_FAILED,
} from '~/constants/messages.constant';
import { DATE_TIME_FORMAT_V2 } from '~/constants/time.constant';
import { getColorStatusCampaign } from '~/helpers/campaign.helper';
import { Campaign } from '~/models/Campaign.model';

import {
  CalendarDaysIcon,
  EllipsisHorizontalIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from '@remix-run/react';

import InviteCard from './InviteCard';

type CampaignCardProps = {
    campaign: Campaign
    onReload: () => void
}

function CampaignCard({ campaign, onReload }: CampaignCardProps) {
    const [isModal, setIsModal] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleMenuClick = (key: string) => {
        switch (key) {
            case 'invite':
                setIsModal(true)
                break;
            case 'view':
                navigate(`/manager/${campaign.id}`)
                break;
            case 'edit':
                navigate(`/manager/edit/${campaign.id}`)
                break;
            case 'delete':
                handleDeleteCampaign()
                break;
            default:
                break;
        }
    };

    const handleDeleteCampaign = async () => {
        await deleteCampaign(campaign.id as string).then(() => {
            toast.error(DELETE_CAMPAGIN_SUCCESS)
            onReload()
        })
            .catch(() => { toast.error(DELETE_CAMPAIGN_FAILED) })
    }

    const menu = (
        <Menu onClick={(e) => handleMenuClick(e.key)}>
            {campaignMenuItems.map(item => (
                <Menu.Item key={item.key}>
                    <div className='flex gap-2 items-center'>
                        {item.icon}
                        {item.label}
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className='h-[300px] cursor-pointer p-5 border flex flex-col justify-between border-gray-200 hover:shadow-lg transition-shadow rounded-[20px] shadow-md'>
            <div className='items-center flex justify-between'>
                <div style={{ backgroundColor: getColorStatusCampaign(campaign.status)?.background }}
                    className={`inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px]`}>
                    <div style={{ backgroundColor: getColorStatusCampaign(campaign.status)?.color }}
                        className={`w-2 h-2 rounded-[50%]`}></div>
                    <span style={{ color: getColorStatusCampaign(campaign.status)?.color }} className='text-[12px] capitalize '>{campaign.status}</span>
                </div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <button className='hover:bg-[#D1D5DB] bg-[#F3F4F6] transition-all w-7 h-7 flex justify-center items-center rounded-md'>
                        <EllipsisHorizontalIcon width={20} />
                    </button>
                </Dropdown>
            </div>
            <div className='mt-4f'>
                <h5 className='text-sm text-[#1F2937] font-medium'>{campaign.name}</h5>
                <div className='flex items-center gap-1'>
                    <CalendarDaysIcon width={16} color='#6B7280' />
                    <p className='mt-1 text-sm text-[#6B7280]'>{dayjs(campaign.deadline).format(DATE_TIME_FORMAT_V2)}</p>
                </div>
            </div>
            <div className='flex items-center justify-between gap-2'>
                <div className='w-1/2 p-3 h-[100px] flex flex-col justify-between rounded-xl bg-[#F3F4F6]'>
                    <p className='text-sm text-[#6B7280] font-semibold'>Revenue on investment</p>
                    <p className='mt-2 text-[#111827] font-semibold text-[18px]'>%20.5</p>
                </div>
                <div className='w-1/2 p-3 h-[100px] rounded-xl bg-[#F3F4F6]'>
                    <p className='text-sm text-[#6B7280] font-semibold'>Performance (CVR ETC)</p>
                    <p className='mt-2 text-[#111827] font-semibold text-[18px]'>%20.5</p>
                </div>
            </div>
            <div className='flex items-center'>
                <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[87px] font-semibold rounded-[8px] text-[#1F2937]'>
                    <UserPlusIcon width={16} />  Invite
                </button>
                {/* <Avatar.Group
                    className='h-[36px]'
                    size="large"
                    max={{
                        count: 4,
                        style: { color: '#374151', backgroundColor: '#F3F4F6', cursor: 'pointer' },
                        popover: { trigger: 'click' },
                    }}
                >
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar style={{ backgroundColor: '#87d068' }} />
                    </Tooltip>
                    <Avatar style={{ backgroundColor: '#1677ff' }} />
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                </Avatar.Group> */}
            </div>

            {/* Modal invite influencer */}
            <Modal width={650} title='Invite Incluencer' open={isModal} onCancel={() => setIsModal(false)} footer={[

                <div className='flex border-t border-t-gray-300 pt-5 items-center justify-end gap-2'>
                    <Button type='default' >Close</Button>
                    <Button type='primary' >Send Invitation</Button>
                </div>

            ]} >
                <div>
                    <h5 className='text-[#374151] text-center'>Invite your Influencer to review collaborate on this campaign.</h5>
                    <div className='flex mt-8 items-center justify-between'>
                        <Checkbox>Select All</Checkbox>
                        <p className='text-[#1F2937] text-sm'>Already in this campaign (0)</p>
                    </div>
                    <div className='h-[330px] mb-8 mt-4 pr-2 overflow-y-scroll w-full flex flex-col gap-3'>
                        <InviteCard />
                        <InviteCard />
                        <InviteCard />
                        <InviteCard />
                        <InviteCard />
                        <InviteCard />
                        <InviteCard />
                        <InviteCard />
                        <InviteCard />
                        <InviteCard />
                    </div>
                </div>

            </Modal>

        </div>
    )
}

export default CampaignCard

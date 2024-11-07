import React, {
  useEffect,
  useState,
} from 'react';

import {
  Avatar,
  Button,
  Checkbox,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { toast } from 'react-toastify';
import { inviteInfluencerToCampaign } from '~/apis/campaign';
import DefaultAvatar from '~/assets/avatar.jpeg';
import { INVITED_INFLUENCERS } from '~/constants/messages.constant';
import { Creator } from '~/models/User.model';
import { formatName } from '~/utils/formatNumber';

import { CheckIcon } from '@radix-ui/react-icons';

import ModalViewInfluencerProfile from './ModalViewInfluencerProfile';

type InviteCardProps = {
    influencer: Creator
    checked: boolean
    onSelect: (id: string, checked: boolean) => void
    campaignId: string
}

function InviteCard({ influencer, checked, onSelect, campaignId }: InviteCardProps) {
    const [invited, setInvited] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [isModal, setIsModal] = useState<boolean>(false)

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        onSelect(influencer.id as string, e.target.checked);
    };

    const handleInviteInfluencer = async (): Promise<void> => {
        setLoading(true)
        const creatorIds = [influencer.id]
        await inviteInfluencerToCampaign(campaignId, creatorIds as string[])
            .then(() => {
                setInvited(true)
                toast.success(INVITED_INFLUENCERS)
            })
            .catch((err) => toast.error(err?.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setInvited(influencer?.alreadyInvited as boolean)
    }, [influencer?.alreadyInvited])

    return (
        <div className='p-4 rounded-md flex items-center justify-between border border-[#ESE7EB]'>
            <div className='w-full'>
                <div className='flex items-start gap-4'>
                    <Checkbox
                        onChange={(e) => handleCheckboxChange(e)}
                        checked={checked} ></Checkbox>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex cursor-pointer items-start relative gap-4'>
                            <Avatar onClick={() => setIsModal(true)} src={influencer?.avatarUrl || DefaultAvatar} />
                            <div>
                                <h5 className='text-[#1F2937] text-sm'>{formatName(influencer.name as string)}</h5>
                                <span className='text-[#6B7280] text-sm'>{influencer.email}</span>
                            </div>
                            {/* <div className='absolute right-0 flex items-center gap-1 top-0'>
                                <img src={IG_ICON} alt="insta" />
                                <span className='text-xs text-gray-800'>{influencer.followers}k</span>
                            </div> */}
                        </div>
                        <div >
                            {invited
                                ? <div className='flex h-[28px] justify-center rounded-md w-[74px] items-center  bg-[#F3F4F6]'><CheckIcon width={20} />Invited</div>
                                : <Button loading={loading} className='h-[28px]' onClick={handleInviteInfluencer} type='primary'>Invite</Button>
                            }
                        </div>
                        <div className='hidden w-full  items-end border-dashed border-t border-t-gray-200 justify-between'>
                            <div className='flex items-start mt-4  h-[28px] gap-2'>
                                {/* <Button type='text' className='bg-gray-200 h-[28px]'>Age: {influencer.age}</Button>
                                <Button type='text' className='bg-gray-200 h-[28px]'>{influencer.gender}</Button>
                                <Button type='text' className='bg-gray-200 h-[28px]'>{influencer.country}</Button> */}
                            </div>
                        </div>
                    </div>
                </div>
                {isModal && (
                    <ModalViewInfluencerProfile id={influencer.id} open={isModal} onClose={() => setIsModal(false)} />
                )}
            </div>

        </div>
    )
}

export default InviteCard

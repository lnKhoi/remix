import React, {
  useEffect,
  useState,
} from 'react';

import {
  Avatar,
  Checkbox,
  DatePicker,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import DefaultAvatar from '~/assets/avatar.jpeg';
import { Creator } from '~/models/User.model';
import { formatName } from '~/utils/formatNumber';

import TagColor from '../ui/tagColor';
import ModalViewInfluencerProfile from './ModalViewInfluencerProfile';

type InviteCardProps = {
    influencer: Creator
    checked: boolean
    onSelect: (id: string, checked: boolean) => void
    campaignId: string
}

function InviteCard({ influencer, checked, onSelect, campaignId }: InviteCardProps) {
    const [invited, setInvited] = useState<boolean>(false)
    const [isModal, setIsModal] = useState<boolean>(false)

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        onSelect(influencer.id as string, e.target.checked);
    };

    useEffect(() => {
        setInvited(influencer?.alreadyInvited as boolean)
    }, [influencer?.alreadyInvited])


    return (
        <div className='p-4 rounded-md cursor-pointer hover:border-blue-500 transition-all flex items-center justify-between border border-[#ESE7EB]'>
            <div className='w-full'>
                <div className='flex items-start gap-4'>
                    <Checkbox
                        disabled={invited}
                        onChange={(e) => handleCheckboxChange(e)}
                        checked={checked} ></Checkbox>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex cursor-pointer items-start relative gap-4'>
                            <Avatar onClick={() => setIsModal(true)} src={influencer?.avatarUrl || DefaultAvatar} />
                            <div>
                                <h5 className='text-[#1F2937] text-sm'>{formatName(influencer.name as string)}</h5>
                                <span className='text-[#6B7280] text-sm'>{influencer.email}</span>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <DatePicker style={{ maxHeight: 36 }} className='h-[36px] border-none bg-gray-100' />
                            </div>
                            {invited &&
                                <div className='block'> <TagColor background='#DBEAFE' color='#1D4ED8' status='Invited' /></div>
                            }
                        </div>
                        <div className='hidden w-full  items-end border-dashed border-t border-t-gray-200 justify-between'>
                            <div className='flex items-start mt-4  h-[28px] gap-2'>
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

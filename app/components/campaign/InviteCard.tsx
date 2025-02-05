import React, {
  useEffect,
  useState,
} from 'react';

import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import DefaultAvatar from '~/assets/avatar.jpeg';
import IG_ICON from '~/assets/insta.svg';
import { DATE_TIME_FORMAT } from '~/constants/time.constant';
import { Creator } from '~/models/User.model';
import { formatName } from '~/utils/formatNumber';

import { InviteInfluencer } from './ModalInviteInfluencerToCampaign';
import ModalViewInfluencerProfile from './ModalViewInfluencerProfile';

type InviteCardProps = {
    influencer: Creator
    checked: boolean
    onSelect: (id: string, checked: boolean, deadline: string) => void
    selectedInfluencer: InviteInfluencer[]
    globalDeadlineTrigger:string | null
}

function InviteCard({ influencer, checked, onSelect, selectedInfluencer,globalDeadlineTrigger }: InviteCardProps) {
    const [invited, setInvited] = useState<boolean>(false)
    const [isModal, setIsModal] = useState<boolean>(false)
    const [deadline, setDeadline] = useState<null | string>(null)

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        if (!deadline) {
            toast.warning('Please select Deadline', { position: 'top-center' })
        } else {
            e.target.checked == false && setDeadline(null)
            onSelect(influencer.id as string, e.target.checked, deadline as string);
        }
    };

    useEffect(() => {
        setInvited(influencer?.alreadyInvited as boolean)
    },[influencer.alreadyInvited])

    useEffect(() => {
        const defaultDeadline = selectedInfluencer.find(i => i?.id === influencer?.id)?.deadline
        setDeadline(globalDeadlineTrigger || defaultDeadline || influencer?.deadline as string)
    }, [influencer.deadline,globalDeadlineTrigger,globalDeadlineTrigger])

    console.log(influencer)
    return (
        <div className='p-4 rounded-md hover:border-blue-500 transition-all flex items-center justify-between border border-gray-100'>
            <div className='w-full'>
                <div className='flex items-start gap-4'>
                    <Checkbox
                        disabled={invited}
                        onChange={(e) => handleCheckboxChange(e)}
                        checked={checked} ></Checkbox>
                    <div className='flex flex-col items-start justify-between w-full'>
                        <div className='flex flex-col  w-full cursor-pointer items-start relative'>
                            <div className='flex items-center w-full justify-between'>
                                <div className='flex gap-3 '>
                                    <Avatar onClick={() => setIsModal(true)} src={influencer?.avatarUrl || DefaultAvatar} />
                                    <div>
                                        <h5 className='text-[#1F2937] text-sm'>{formatName(influencer.name as string)}</h5>
                                        <span className='text-[#6B7280] text-sm'>{influencer.email}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-sm font-medium'>Deadline</span>
                                    <DatePicker
                                        value={deadline ? dayjs(deadline) : null}
                                        allowClear={false}
                                        format={DATE_TIME_FORMAT}
                                        disabledDate={(current) => {
                                            return current && current <= dayjs().endOf("day");
                                        }}
                                        onChange={(e) => {
                                            setDeadline(e.toISOString());
                                            onSelect(influencer.id as string, true, e.toISOString() as string)
                                        }
                                        }
                                        className='bg-gray-100 border-none hover:bg-gray-100 cursor-pointer' />
                                </div>
                            </div>
                            <div className='flex mt-1 items-center gap-[6px]'>
                                <img src={IG_ICON} alt="insta" />
                                <span className='text-xs text-gray-800 font-medium'>{influencer.followers}12k</span>
                            </div>
                        </div>

                        <div className=' w-full mt-3 items-end border-dashed border-t border-t-gray-200 justify-between'>
                            <div className='flex items-start mt-4  h-[28px] gap-2'>
                                <Button type='text' className='bg-gray-200 h-[28px]'>Age: 20 - 32</Button>
                                <Button type='text' className='bg-gray-200 h-[28px]'>Gender: Female</Button>
                                <Button type='text' className='bg-gray-200 h-[28px]'>Location: Vietnam</Button>
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

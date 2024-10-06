import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Checkbox,
  Modal,
  Segmented,
} from 'antd';
import { toast } from 'react-toastify';
import {
  getListInfluencerInviteInCampaign,
  inviteInfluencerToCampaign,
} from '~/apis/campaign';
import { INVITED_INFLUENCERS } from '~/constants/messages.constant';
import { Creator } from '~/models/User.model';

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

import InviteCard from './InviteCard';

type Align = 'Influencer' | 'Others'

type ModalInviteInfluencerToCampaign = {
    open: boolean,
    onClose: Dispatch<SetStateAction<boolean>>
    campaignId: string
}

function ModalInviteInfluencerToCampaign({ onClose, open, campaignId }: ModalInviteInfluencerToCampaign) {
    const [alignValue, setAlignValue] = useState<Align>('Influencer');
    const [selectAll, setSelectAll] = useState<boolean>(false)
    const [influencers, setInfluencers] = useState<Creator[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([])

    const handleSelectAll = (): void => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedInfluencers(influencers.map((c: Creator) => c.id as string));
        } else {
            setSelectedInfluencers([]);
        }
    };

    const handleSelectCard = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedInfluencers([...selectedInfluencers, id]);
        } else {
            setSelectedInfluencers(selectedInfluencers.filter(cardId => cardId !== id));
        }
    };

    const handleGetInfluencers = async () => {
        await getListInfluencerInviteInCampaign(campaignId as string,100, 1)
        .then((res) => setInfluencers(res?.data?.creatorsWithInvitationStatus))
    }

    const handleInviteInfluencers = async (): Promise<void> => {
        setLoading(true)
        await inviteInfluencerToCampaign(campaignId,selectedInfluencers as string[])
            .then(() => {
                toast.success(INVITED_INFLUENCERS)
            })
            .catch((err) => toast.error(err?.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => { handleGetInfluencers()}, [])

    useEffect(() => {
        selectedInfluencers.length === influencers.length && selectedInfluencers.length > 0
            ? setSelectAll(true)
            : setSelectAll(false)
    }, [selectedInfluencers])

    return (
        <Modal width={650} title='' open={open} onCancel={() => onClose(false)} footer={[

            <div className='flex border-t border-t-gray-300 pt-5 items-center justify-end gap-2'>
                <Button onClick={(): void => onClose(false)} type='default' >Close</Button>
                <Button loading={loading} onClick={handleInviteInfluencers} type='primary' >Send Invitation</Button>
            </div>

        ]} >
            <div>
                <h2 className='text-center text-2xl font-semibold'>Invite Influencer</h2>
                <h5 className='text-[#374151] text-center mt-1'>Invite your Influencer to review collaborate on this campaign.</h5>
                <div className='flex w-full mx-auto justify-center mt-8' >
                    <Segmented
                        defaultValue="Influencer"
                        style={{ marginBottom: 8 }}
                        onChange={(value) => setAlignValue(value as Align)}
                        options={['Influencer', 'Others',]}
                    />
                </div>
                {alignValue === 'Influencer' && (
                    <div>
                        <div className='flex mt-5 items-center justify-between'>
                            <div className='flex items-center gap-1'>
                                <Checkbox checked={selectAll} onChange={handleSelectAll} >Select All</Checkbox>
                                <span className='text-gray-600'>Selected ({selectedInfluencers.length})</span>
                            </div>
                            <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[35px] w-[85px] font-semibold rounded-[7px] text-[#1F2937]'>
                                <AdjustmentsHorizontalIcon width={16} />  Filter
                            </button>
                        </div>
                        <div className='h-[330px] mb-8 mt-4 pr-2 overflow-y-scroll w-full flex flex-col gap-3'>
                            {influencers.map(i => (
                                <InviteCard campaignId={campaignId} onSelect={handleSelectCard} checked={selectedInfluencers.includes(i.id as string)} influencer={i} />
                            ))}
                        </div>
                    </div>
                )}

            </div>

        </Modal>
    )
}

export default ModalInviteInfluencerToCampaign

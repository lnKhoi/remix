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
  Popover,
  Radio,
  Segmented,
  Select,
  Skeleton,
  Slider,
} from 'antd';
import { toast } from 'react-toastify';
import {
  getListInfluencerInviteInCampaign,
  inviteInfluencerToCampaign,
} from '~/apis/campaign';
import { countries } from '~/constants/countries.constant';
import {
  ageAudience,
  genderFilterOptions,
  socials,
} from '~/constants/creator.constant';
import { INVITED_INFLUENCERS } from '~/constants/messages.constant';
import { Creator } from '~/models/User.model';
import { formatNumber } from '~/utils/formatNumber';

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

import InviteCard from './InviteCard';

type Align = 'Influencer' | 'Others'

type ModalInviteInfluencerToCampaign = {
    open: boolean,
    onClose: Dispatch<SetStateAction<boolean>>
    campaignId: string
}

export type Filter = {
    age: number[];
    gender: string[];
    location: string;
    socialMedias: string[];
    minFollow: number | string
    maxFollow: number | string
};

const initialFilter = { age: [0, 100], gender: [], location: '', socialMedias: [], minFollow: 0, maxFollow: 1500000 }

function ModalInviteInfluencerToCampaign({ onClose, open, campaignId }: ModalInviteInfluencerToCampaign) {
    const [alignValue, setAlignValue] = useState<Align>('Influencer');
    const [selectAll, setSelectAll] = useState<boolean>(false)
    const [influencers, setInfluencers] = useState<Creator[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<string>('')
    const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([])

    const [filter, setFilter] = useState<Filter>(initialFilter);

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

    const handleGetInfluencers = async (filter: Filter) => {
        setLoading('get-list')
        await getListInfluencerInviteInCampaign(campaignId as string, 100, 1, filter)
            .then((res) => setInfluencers(res?.data))
            .finally(() => setLoading(''))
    }

    const handleInviteInfluencers = async (): Promise<void> => {
        const filteredUniqueInfluencer = influencers
            .filter(i => selectedInfluencers.includes(i.id as string) && !i.alreadyInvited).map(influencer => influencer?.id)
        setLoading('invite')
        await inviteInfluencerToCampaign(campaignId, filteredUniqueInfluencer as string[])
            .then(() => {
                toast.success(INVITED_INFLUENCERS)
                setSelectedInfluencers([])
                handleGetInfluencers(filter)
            })
            .catch((err) => toast.error(err?.message))
            .finally(() => setLoading(''))
    }

    useEffect(() => { handleGetInfluencers(filter) }, [alignValue])

    useEffect(() => {
        selectedInfluencers.length === influencers.length && selectedInfluencers.length > 0
            ? setSelectAll(true)
            : setSelectAll(false)
    }, [selectedInfluencers])

    const handleSelectSocial = (id: string): void => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            socialMedias: prevFilter.socialMedias.includes(id)
                ? prevFilter.socialMedias.filter((socialId) => socialId !== id)
                : [...prevFilter.socialMedias, id],
        }));
    };

    const handleSelectGender = (id: string) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            gender: prevFilter.gender.includes(id)
                ? prevFilter.gender.filter((gender) => gender !== id)
                : [...prevFilter.gender, id],
        }));
    }

    const handleResetFilter = (): void => {
        setFilter(initialFilter)
        handleGetInfluencers(initialFilter)
        setModal(false)
    }


    return (
        <Modal width={650} title='' open={open} onCancel={() => onClose(false)} footer={[
            <div className='flex border-t border-t-gray-300 pt-5 items-center justify-end gap-2'>
                <Button onClick={(): void => onClose(false)} type='default' >Close</Button>
                <Button
                    disabled={selectedInfluencers.length <= 0}
                    loading={loading === 'invite' && selectedInfluencers.length > 0}
                    onClick={handleInviteInfluencers}
                    type='primary' >
                    Send Invitation
                </Button>
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
                            <Popover
                                content={
                                    <div className='w-[368px] custom-input flex flex-col gap-1'>
                                        <div>
                                            <span className='text-sm text-gray-800 font-medium'>Age Audience</span>
                                            <div>
                                                <Radio.Group onChange={(e) => setFilter({ ...filter, age: e.target.value })}>
                                                    <div className='grid w-[330px] mt-2 grid-cols-2 gap-2'>
                                                        {ageAudience?.map(a => (
                                                            <Radio key={a.label} value={a.value} >{a.label}</Radio>
                                                        ))}
                                                    </div>
                                                </Radio.Group>
                                            </div>
                                        </div>
                                        <div className='mt-3'>
                                            <span className='text-sm text-gray-800 font-medium'>Gender Audience</span>
                                            <div className='flex items-center gap-2 mt-2'>
                                                {genderFilterOptions?.map(g => (
                                                    <div
                                                        onClick={() => handleSelectGender(g)}
                                                        key={g}
                                                        className={`h-[34px] px-3 ${!filter.gender.includes(g) ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'} text-sm cursor-pointer font-medium flex items-center justify-center rounded-lg capitalize`}>
                                                        {g}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='mt-4'>
                                                <span className='text-sm text-gray-800 font-medium'>Social Media Platform</span>
                                                <div className='flex items-center gap-2 mt-2'>
                                                    {socials?.map(s => (
                                                        <div
                                                            key={s.name}
                                                            onClick={() => handleSelectSocial(s.name)}
                                                            className={`h-[34px] px-3 text-sm cursor-pointer ${filter.socialMedias.includes(s.name) ? 'bg-blue-500 text-white' : 'bg-gray-200  text-gray-800'} 
                                                                 font-medium flex items-center justify-center rounded-lg capitalize`}>
                                                            {s.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='mt-[18px] flex flex-col gap-2'>
                                                <span className='text-sm text-gray-800 font-medium'>Location Audience</span>
                                                <Select
                                                    placeholder="Select a country"
                                                    value={filter?.location}
                                                    showSearch
                                                    allowClear
                                                    optionFilterProp="children"
                                                    onChange={(l) => setFilter({ ...filter, location: l })}
                                                >
                                                    {countries?.map((country) => (
                                                        <Select.Option key={country.value} value={country.label}>
                                                            <span role="img" aria-label={country.label} className="mr-2">
                                                                {country.flag}
                                                            </span>
                                                            {country.label}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className='mt-4'>
                                                <span className='text-sm text-gray-800 font-medium'>Follower Count</span>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-xs text-gray-500'>{formatNumber(filter.minFollow as number)}</span>
                                                    <Slider max={5000000} step={500000}
                                                        onChange={(value: number[]) => setFilter({ ...filter, minFollow: value[0], maxFollow: value[1] })}
                                                        range={{ draggableTrack: true }} defaultValue={[filter.minFollow as number, filter.maxFollow as number]} className='w-full' />
                                                    <span className='text-xs text-gray-500'>{formatNumber(filter.maxFollow as number)}</span></div>
                                            </div>

                                            <div className='flex w-full items-center gap-2 mt-5 justify-end'>
                                                <Button onClick={handleResetFilter} type='default' >Reset</Button>
                                                <Button onClick={() => { handleGetInfluencers(filter); setModal(false) }} type='primary' >Apply</Button>
                                            </div>
                                        </div>

                                    </div>
                                }
                                title=""
                                placement='bottom'
                                trigger="click"
                                open={modal}
                                onOpenChange={() => setModal(!modal)}
                            >
                                <button className='bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[35px] w-[85px] font-semibold rounded-[7px] text-[#1F2937]'>
                                    <AdjustmentsHorizontalIcon width={16} /> Filter
                                </button>
                            </Popover>
                        </div>
                        <div className='h-[330px] mb-8 mt-4 pr-2 overflow-y-scroll w-full flex flex-col gap-3'>
                            {loading === 'get-list'
                                ? <> {Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index} className="border border-gray-200 rounded-md p-4">
                                        <Skeleton key={index} active avatar paragraph={{ rows: 1 }} />
                                    </div>
                                ))}</>
                                : <> {influencers?.map(i => (
                                    <InviteCard key={i.id} campaignId={campaignId} onSelect={handleSelectCard} checked={selectedInfluencers.includes(i.id as string)} influencer={i} />
                                ))}</>
                            }
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default ModalInviteInfluencerToCampaign
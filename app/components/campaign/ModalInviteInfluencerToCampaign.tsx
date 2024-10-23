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
  Segmented,
  Select,
  Slider,
} from 'antd';
import { toast } from 'react-toastify';
import {
  getListInfluencerInviteInCampaign,
  inviteInfluencerToCampaign,
} from '~/apis/campaign';
import { filterFollowerOptions } from '~/constants/campaign.constant';
import { countries } from '~/constants/countries.constant';
import {
  genderFilterOptions,
  socials,
} from '~/constants/creator.constant';
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
  
  export type Filter = {
      age: number[];
      gender: string[];
      location: string;
      socialMedias: string[];
      minFollow: string
      maxFollow: string
  };
  
  const initialFilter = { age: [0, 100], gender: [], location: '', socialMedias: [], minFollow: '', maxFollow: '' }
  
  function ModalInviteInfluencerToCampaign({ onClose, open, campaignId }: ModalInviteInfluencerToCampaign) {
      const [alignValue, setAlignValue] = useState<Align>('Influencer');
      const [selectAll, setSelectAll] = useState<boolean>(false)
      const [influencers, setInfluencers] = useState<Creator[]>([])
      const [modal, setModal] = useState<boolean>(false)
      const [loading, setLoading] = useState<boolean>(false)
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
          await getListInfluencerInviteInCampaign(campaignId as string, 100, 1, filter)
              .then((res) => setInfluencers(res?.data?.creatorsWithInvitationStatus))
      }
  
      const handleInviteInfluencers = async (): Promise<void> => {
          setLoading(true)
          await inviteInfluencerToCampaign(campaignId, selectedInfluencers as string[])
              .then(() => {
                  toast.success(INVITED_INFLUENCERS)
              })
              .catch((err) => toast.error(err?.message))
              .finally(() => setLoading(false))
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
                              <Popover
                                  content={
                                      <div className='w-[368px] custom-input flex flex-col gap-1'>
                                          <div>
                                              <span className='text-sm text-gray-800 font-medium'>Age Audience</span>
                                              <div className='flex items-center gap-2'>
                                                  <span className='text-xs text-gray-500'>{filter.age?.[0]}</span>
                                                  <Slider onChange={(value: number[]) => setFilter({ ...filter, age: value })}
                                                      range={{ draggableTrack: true }} value={filter.age} className='w-full' />
                                                  <span className='text-xs text-gray-500'>{filter?.age?.[1]}</span></div>
                                          </div>
  
                                          <div>
                                              <span className='text-sm text-gray-800 font-medium'>Gender</span>
                                              <div className='flex items-center gap-2 mt-2'>
                                                  {genderFilterOptions.map(g => (
                                                      <div
                                                          onClick={() => handleSelectGender(g)}
                                                          key={g}
                                                          className={`h-[34px] px-3 ${!filter.gender.includes(g) ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'} text-sm cursor-pointer font-medium flex items-center justify-center rounded-lg capitalize`}>
                                                          {g}
                                                      </div>
                                                  ))}
                                              </div>
                                              <div className='mt-3 flex flex-col gap-2'>
                                                  <span className='text-sm text-gray-800 font-medium'>Location</span>
                                                  <Select
                                                      placeholder="Select a country"
                                                      value={filter.location}
                                                      showSearch
                                                      allowClear
                                                      optionFilterProp="children"
                                                      onChange={(l) => setFilter({ ...filter, location: l })}
                                                  >
                                                      {countries.map((country) => (
                                                          <Select.Option key={country.value} value={country.label}>
                                                              <span role="img" aria-label={country.label} className="mr-2">
                                                                  {country.flag}
                                                              </span>
                                                              {country.label}
                                                          </Select.Option>
                                                      ))}
                                                  </Select>
                                              </div>
                                              <div className='mt-3'>
                                                  <span className='text-sm text-gray-800 font-medium'>Social Media</span>
                                                  <div className='flex items-center gap-2 mt-2'>
                                                      {socials.map(s => (
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
                                              <div className='mt-3 flex flex-col'>
                                                  <span className='text-sm text-gray-800  mb-2 font-medium'>Follower Count</span>
                                                  <Select
                                                      placeholder="Number of followers"
                                                    //   value={filter.location}
                                                      allowClear
                                                      defaultValue={'1'}
                                                      optionFilterProp="children"
                                                    //   onChange={(l) => setFilter({ ...filter, location: l })}
                                                  >
                                                      {filterFollowerOptions.map((f) => (
                                                          <Select.Option key={f.value} value={f.label}>
                                                              <span role="img" aria-label={f.label} className="mr-2">
                                                              </span>
                                                              {f.label}
                                                          </Select.Option>
                                                      ))}
                                                  </Select>
                                              </div>
  
  
                                              <div className='flex w-full items-center gap-2 mt-5 justify-end'>
                                                  <Button onClick={handleResetFilter} type='default' >Reset</Button>
                                                  <Button onClick={() => {handleGetInfluencers(filter);setModal(false)}} type='primary' >Apply</Button>
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
  
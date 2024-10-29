import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Breadcrumb,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import {
  getCampaignDetails,
  updateCampaign,
} from '~/apis/campaign';
import TotalBudgetBox from '~/components/campaign/TotalBudgetBox';
import { discountOptions } from '~/constants/campaign.constant';
import { countries } from '~/constants/countries.constant';
import { socials } from '~/constants/creator.constant';
import {
  BUDGET_REQUIRED,
  CAMPAIGN_REQUIRED,
  DISCOUNT_REQUIRED,
  LOCATION_REQUIRED,
  MAXIMUM_PARTICIPANT,
  PLEASE_SELECT_DEADLINE,
  PLEASE_SELECT_GENDER,
  REQUIRED,
} from '~/constants/messages.constant';
import { DATE_TIME_FORMAT_V2 } from '~/constants/time.constant';
import { Campaign } from '~/models/Campaign.model';
import Editor from '~/plugins/editor';

import {
  FilmIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { MetaFunction } from '@remix-run/cloudflare';
import {
  Link,
  useParams,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Edit Campaign' }]
}

const { Option } = Select;

const CampaignForm = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [discountType, setDiscountType] = useState<string>('percentage')
  const [selectedSocials, setSelectedSocials] = useState<string[]>([]);

  const { id } = useParams()
  const budget = Form.useWatch('budget', form);
  const contentFormat = Form.useWatch('contentFormat', form)
  const maximumParticipants = Form.useWatch('maximumParticipants', form);

  const onFinish = async (values: Campaign): Promise<void> => {
    setLoading(true)
    const ageRange = form.getFieldValue('age').split('-').map(Number);

    const payload = {
      ...values,
      discount: Number(values.discount),
      campaignOverview: content,
      deadline: dayjs(values.deadline).toISOString(),
      discountType: discountType,
      socialMedia: selectedSocials,
      age: ageRange
    }

    await updateCampaign(payload as Campaign, id as string)
      .then((res) => {
        toast.success('Update campaign successfully!')
      })
      .catch(err => toast.error(err?.message))
      .finally(() => setLoading(false))
  };


  const handleSelectSocial = (id: string) => {
    setSelectedSocials((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((socialId) => socialId !== id)
        : [...prevSelected, id]
    );
  };

  const handleChangeContent = (content: string): void => {
    setContent(content)
  }

  const handleGetCampaignDetails = async (): Promise<void> => {
    await getCampaignDetails(id as string).then((res) => {
      const campaign: Campaign = res.data

      setSelectedSocials(campaign?.socialMedia)
      setContent(campaign.campaignOverview)

      if (campaign) {
        const formattedAge = `${campaign?.age?.[0]}-${campaign?.age?.[1]}`;
        form.setFieldsValue({
          ...campaign,
          deadline: dayjs(campaign.deadline),
          age: formattedAge
        });
      }

    })
  }

  useEffect(() => {
    handleGetCampaignDetails()
  }, [])

  useEffect(() => {
    if (budget && maximumParticipants) {
      const totalBudget = budget * maximumParticipants;
      form.setFieldsValue({ totalBudget });
    }
  }, [budget, maximumParticipants]);

  
  return (
    <div className='custom-select custom-form'>
      <ToastContainer />
      <Breadcrumb
        className='fixed h-[40px] w-full '
        items={[
          { title: <Link to={'/manager/campaigns'}>Campaigns</Link>, },
          { title: <p className='text-gray-800'>Edit Campaign</p> },
        ]}
      />
      <div className='flex items-start gap-6 w-full mt-14 mx-auto justify-center'>
        {/* Campaign Form */}
        <div className='w-[650px]'>
          <h2 className='text-gray-900 mt-14 mb-5 text-lg font-medium text-left'></h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: 'auto' }}
          >

            {/* Campaign Name */}
            <Form.Item
              label="Campaign Name"
              name="name"
              rules={[{ required: true, message: CAMPAIGN_REQUIRED }]}
            >
              <Input maxLength={150} showCount />
            </Form.Item>

            {/* Campaign Budget */}
            <div className='flex items-center gap-3 justify-between'>
              <Form.Item
                className='w-1/2'
                label="Per-Influencer Budget"
                name="budget"
                rules={[{ required: true, message: BUDGET_REQUIRED }]}
                extra="The amount allowcated to each influencer"
              >
                <InputNumber
                  prefix="$"
                  maxLength={10}
                  suffix='USD'
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                className='w-1/2'
                label="Maximum Participants"
                name="maximumParticipants"
                rules={[{ required: true, message: MAXIMUM_PARTICIPANT }]}
                extra="Max Influencers participating in a Campaign"

              >
                <InputNumber
                  min={1}
                  maxLength={2}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                className='w-full'
                label="Influencer Budget"
                name="totalBudget"
                rules={[{ required: true, message: BUDGET_REQUIRED }]}
                extra="Total funds allocated for the campaign's influencer"
              >
                <InputNumber
                  name='budget'
                  prefix="$"
                  disabled
                  suffix='USD'
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>

            {/* Social media */}
            <div className='mb-6'>
              <h6 className='text-sm text-gray-800 font-medium' >Social Media</h6>
              <p className='text-sm text-gray-500 mb-5'>Place content posted for</p>
              <div className='mt-5 flex items-center gap-3'>
                {socials.map(s => (
                  <div
                    onClick={() => handleSelectSocial(s.name)}
                    className={`w-[120px] cursor-pointer relative h-[120px] rounded-xl border flex items-center justify-center ${selectedSocials.includes(s.name) ? 'border-blue-500' : 'border-gray-200'
                      }`}>
                    <Checkbox checked={selectedSocials.includes(s.name)}
                      className='absolute top-3 left-3' />
                    <div className='flex flex-col gap-1 items-center justify-center'>
                      <img src={s.icon} alt="facebook" />
                      <span className='text-[12px capitalize text-gray-700'>{s.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Format */}
            <div>
              <Form.Item
                className='w-1/2'
                label="Content Format"
                name="contentFormat"
                rules={[{ required: true, message: REQUIRED }]}
              >
                <Checkbox.Group>
                  <div className='flex gap-3 items-center'>
                    <div className={`flex gap-5 cursor-pointer border h-[44px] ${contentFormat?.includes('post') ? 'border-blue-600' : 'border-gray-200'} items-center p-3 rounded-xl justify-between`}>
                      <div className='flex gap-2'>
                        <Squares2X2Icon width={20} height={20} />
                        <span>Post</span>
                      </div>
                      <Checkbox value='post' />
                    </div>
                    <div className={`flex gap-5 cursor-pointer border h-[44px] items-center p-3  ${contentFormat?.includes('reel') ? 'border-blue-600' : 'border-gray-200'} rounded-xl justify-between`}>
                      <div className='flex gap-2'>
                        <FilmIcon width={20} height={20} />
                        <span>Reel</span>
                      </div>
                      <Checkbox value='reel' />
                    </div>
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </div>

            {/* Campaign Deadline */}
            <Form.Item
              label="Campaign Deadline"
              name="deadline"
              rules={[{ required: true, message: PLEASE_SELECT_DEADLINE }]}
            >
              <DatePicker
                disabledDate={(current) => {
                  return current && current < dayjs().endOf('day');
                }}
                style={{ width: '100%' }}
                showTime
                format={DATE_TIME_FORMAT_V2} />
            </Form.Item>
            {/* Age */}
            <h2 className='text-sm text-gray-800 font-normal mb-3'>Campaign Demographic</h2>
            <div className='flex items-center'>
              <Form.Item className=' items-center w-full gap-20' name='age' label='Age' rules={[{ required: true, message: REQUIRED }]} >
                  <Radio.Group defaultValue={'18-24'} >
                    <div className='grid gap-2 grid-cols-2'>
                    <Radio value="18-24">18 - 24</Radio>
                    <Radio value="25-32">25 - 32</Radio>
                    <Radio value="33-40">33 - 40</Radio>
                    <Radio value="41-50">41 - 50</Radio>
                    </div>
                  </Radio.Group>
              </Form.Item>
              {/* Gender */}
              <div className='w-full'>
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true, message: PLEASE_SELECT_GENDER }]}
                >
                  <Select placeholder="Select gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="all">All</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className='w-full mt-2 gap-3'>

              {/* Location */}
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: LOCATION_REQUIRED }]}
              >
                <Select
                  placeholder="Select a country"
                  showSearch
                  mode='multiple'
                  allowClear
                  maxTagCount={3} 
                  maxTagPlaceholder={(omittedValues) => `...and ${omittedValues.length} more`} 
                  optionFilterProp="children"
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
              </Form.Item>
            </div>
            {/* Discount */}
            <div className='flex items-center'>
              <div className='w-full'>
                <Form.Item
                  label="Discount"
                  name="discount"
                  rules={[{ required: true, message: DISCOUNT_REQUIRED }]}
                >
                  <InputNumber
                    min={0}
                    prefix={discountType === 'percentage' ? '%' : '$'}
                    max={discountType === 'percentage' ? 100 : 100000000000000}
                    className='w-full'
                  />
                </Form.Item>
              </div>
              <Select
                className='mt-[5px] '
                style={{ width: 150 }}
                onChange={(v) => setDiscountType(v)}
                defaultValue={discountType}
                options={discountOptions}
              />
            </div>

            {/* Editor */}
            <div className='mt-4 border-t border-gray-200 mb-8 pt-6'>
              <h6 className='text-sm text-gray-800 font-medium' >Campaign Overview</h6>
              <p className='text-sm text-gray-500 mb-5'>A summary or description of campaign's goals and strategy.</p>
              <Editor value={content} onChange={(value) => handleChangeContent(value)} />
            </div>

            {/* Submit Button */}
            <div className='flex justify-end h-[35px] items-center'>
              <div className='h-full flex items-center'>
                <Form.Item name='status' initialValue='active' style={{ margin: 0 }}>
                  <Radio.Group>
                    <Radio value={'active'}>Active</Radio>
                    <Radio value={'draft'}>Draft</Radio>
                    <Radio value={'archive'}>Archive</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className='h-full ml-4'>
                <Form.Item>
                  <Button loading={loading} type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Save changes
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        {/* Total Campaign Budget */}
        <TotalBudgetBox maximumParticipants={maximumParticipants} perInfluencerBudget={budget} />
      </div>
    </div>

  );
};

export default CampaignForm;

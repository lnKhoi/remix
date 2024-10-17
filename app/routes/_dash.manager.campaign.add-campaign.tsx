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
  Slider,
} from 'antd';
import dayjs from 'dayjs';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import { createCampaign } from '~/apis/campaign';
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
import { Link } from '@remix-run/react';

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

  const age = Form.useWatch('age', form)
  const budget = Form.useWatch('budget', form);
  const contentFormat = Form.useWatch('contentFormat',form)
  const maximumParticipants = Form.useWatch('maximumParticipants', form);


  const onFinish = async (values: Campaign): Promise<void> => {
    setLoading(true)
    const payload = {
      ...values,
      discount: Number(values.discount),
      campaignOverview: content,
      deadline: dayjs(values.deadline).toISOString(),
      discountType: discountType,
      socialMedia: selectedSocials
    }

    await createCampaign(payload as Campaign)
      .then((res) => {
        toast.success('Create campaign successfully!')
        form.resetFields()
        setSelectedSocials([])
        setContent('')
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

  useEffect(() => {
    form.setFieldsValue({ age: [20, 32] })
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
          { title: <p className='text-gray-800'>Add Campaign</p> },
        ]}
      />
      <div className='w-[700px] mx-auto'>
        <h2 className='text-gray-900 mt-[52px] mb-5  text-lg font-medium text-left'>Add Campaign</h2>
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
          <div>
            <Form.Item
              className='w-full'
              label="Campaign Budget"
              name="totalBudget"
              rules={[{ required: true, message: BUDGET_REQUIRED }]}
              extra="The allocated for a Influencer"
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
          <Form.Item className=' items-center w-full' name='age' label='Age' rules={[{ required: true, message: REQUIRED }]} >
            <div className='flex items-center '>
              <span className='pr-2'>{age?.[0] || 20}</span>
              <Slider defaultValue={[20, 32]} onChange={(value: number[]) => form.setFieldsValue({ age: value })}
                className='w-full' range={{ draggableTrack: true }} />
              <span className='pl-2'> {age?.[1] || 32}</span>
            </div>
          </Form.Item>

          <div className='grid grid-cols-2 gap-3'>

            {/* Gender */}
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: PLEASE_SELECT_GENDER }]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
                <Option value="all">All</Option>
              </Select>
            </Form.Item>

            {/* Location */}
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: LOCATION_REQUIRED }]}
            >
              <Select
                placeholder="Select a country"
                showSearch
                allowClear
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
                  prefix={discountType ==='percentage' ? '%' : '$'}
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
          <div className='mt-4  border-t border-gray-200 mb-8 pt-6'>
            <h6 className='text-sm text-gray-800 font-medium' >Campaign Overview</h6>
            <p className='text-sm text-gray-500 mb-5'>A summary or description of campaign's goals and strategy.</p>
            <Editor value={content} onChange={(value) => handleChangeContent(value)} />
          </div>

          {/* Submit Button */}
          <div className='flex  justify-end h-[35px]   items-center'>
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
    </div>

  );
};

export default CampaignForm;

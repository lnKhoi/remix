import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';

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
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import { createCampaign } from '~/apis/campaign';
import { countries } from '~/constants/countries.constant';
import { socials } from '~/constants/creator.constant';
import {
  BUDGET_REQUIRED,
  CAMPAIGN_REQUIRED,
  DISCOUNT_REQUIRED,
  LOCATION_REQUIRED,
  PLEASE_SELECT_DEADLINE,
  PLEASE_SELECT_GENDER,
  REQUIRED,
} from '~/constants/messages.constant';
import { Campaign } from '~/models/Campaign.model';
import Editor from '~/plugins/editor';

import { MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Add Campaign' }]
}

const { Option } = Select;

const CampaignForm = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('')
  const [loading,setLoading] = useState<boolean>(false)

  const onFinish =  async (values: Campaign) : Promise<void> => {
    setLoading(true)
    const payload = {
      ...values,
      campaignOverview: value,
      deadline: 0,
      discountType: 'percentage',
      socialMedia: 'facebook'
    }

    await createCampaign(payload as Campaign)
    .then((res) => toast.success('Create campaign successfully!'))
    .catch(err => toast.error(err?.message))
    .finally(() => setLoading(false))
  };

  const [selectedSocials, setSelectedSocials] = useState<string[]>([]);

  const handleSelectSocial = (id: string) => {
    setSelectedSocials((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((socialId) => socialId !== id)
        : [...prevSelected, id]
    );
  };

  const handleChangeContent = (content: string): void => {
    setValue(content)
  }

  return (
    <div>
       <ToastContainer />
      <Breadcrumb
        items={[
          {
            title: <Link to={'/manager/campaigns'}>Campaigns</Link>,
          },
          {
            title: <p className='text-gray-800'>Add Campaign</p>
          },
        ]}
      />
      <div className='w-[750px] mx-auto'>
        <h2 className='text-gray-900 mt-[52px] mb-5 text-lg font-medium text-center'>Add Campaign</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: '600px', margin: 'auto' }}
        >

          {/* Campaign Name */}
          <Form.Item
            label="Campaign Name"
            name="name"
            rules={[{ required: true, message: CAMPAIGN_REQUIRED }]}
          >
            <Input />
          </Form.Item>

          {/* Campaign Budget */}

          <Form.Item
            label="Campaign Budget"
            name="budget"
            rules={[{ required: true, message: BUDGET_REQUIRED }]}
          >
            {/* <span className='transform -translate-y-1 text-sm text-gray-500'>The allocated for an Influencer</span> */}
            <InputNumber
              prefix="$"
              suffix='USD'
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>

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
                    <span className='text-[12px] text-gray-700'>{s.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Deadline */}
          <Form.Item
            label="Campaign Deadline"
            name="deadline"
            rules={[{ required: true, message: PLEASE_SELECT_DEADLINE }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          {/* Age */}
          <div className='grid grid-cols-4 gap-3'>
            <Form.Item
              label="Min Age"
              name="minAge"
              rules={[{ required: true, message: REQUIRED }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Max Age"
              name="maxAge"
              rules={[{ required: true, message: REQUIRED }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
            {/* Gender */}
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: PLEASE_SELECT_GENDER }]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="all">Other</Option>
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
                optionFilterProp="label"
              >
                {countries.map((country) => (
                  <Select.Option key={country.value} value={country.value}>
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
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: DISCOUNT_REQUIRED }]}
          >
            <InputNumber
              prefix="%"
              min={0}
              max={100}
              style={{ width: '100%' }}
            />
          </Form.Item>

          {/* Editor */}
          <div className='mt-4  border-t border-gray-200 mb-8 pt-6'>
            <h6 className='text-sm text-gray-800 font-medium' >Campaign Overview</h6>
            <p className='text-sm text-gray-500 mb-5'>A summary or description of campaign's goals and strategy.</p>
            <Editor onChange={(value) => handleChangeContent(value)} />
          </div>

          {/* Submit Button */}
          <div className='flex justify-end h-[35px] mb-8  items-center'>
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

import {
  memo,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Checkbox,
  DatePicker,
  message,
  Select,
  Slider,
} from 'antd';
import { Dayjs } from 'dayjs';
import {
  getAllCampaigns,
  getAllInfluencerInContent,
} from '~/apis/content';
import { Campaign } from '~/models/Campaign.model';
import { Creator } from '~/models/User.model';
import { formatNumber } from '~/utils/formatNumber';

const { Option } = Select;


// Base interface for shared properties
interface BaseFormData {
  campaignIds: string[];
  influencerIds: string[];
  engagementRate: number[];
  conversionRate: string[];
  costPerClick: number[];
  revenue: number[];
  clicks: number[];
  purchases: number[];
}

// Interface for the form state (used internally with Dayjs)
interface FormState extends BaseFormData {
  from: Dayjs | null;
  to: Dayjs | null;
}

// Interface for the payload (used for onFilter with string dates)
export interface FormData extends BaseFormData {
  from: string | null;
  to: string | null;
}

type ModalFilterContentProps = {
  onFilter: (payload: FormData | null) => void;
}

const ModalFilterContent = ({ onFilter }: ModalFilterContentProps) => {

  const [formData, setFormData] = useState<FormState>({
    from: null,
    to: null,
    campaignIds: [],
    influencerIds: [],
    engagementRate: [0, 150],
    conversionRate: [],
    costPerClick: [0, 1000000],
    revenue: [0, 1000000],
    clicks: [0, 1000000],
    purchases: [0, 100000],
  });

  const [influencers, setInfluencers] = useState<Creator[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  const handleStartDateChange = (date: Dayjs | null) => {
    if (date && formData.to && date.isAfter(formData.to)) {
      message.error('Start date must be before end date');
      return;
    }
    setFormData({ ...formData, from: date });
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    if (date && !formData.from) {
      message.error('Please select a start date first');
      return;
    }
    if (date && formData.from && date.isBefore(formData.from)) {
      message.error('End date must be after start date');
      return;
    }
    setFormData({ ...formData, to: date });
  };

  const handleSubmit = () => {
    if (formData.to && !formData.to) {
      message.error('Please select a start date before submitting');
      return;
    }
    const payload = {
      ...formData,
      from: formData.from?.toISOString(),
      to: formData.to?.toISOString(),
    };
    onFilter(payload as FormData)

  };

  const handleReset = () => {
    setFormData({
      from: null,
      to: null,
      campaignIds: [],
      influencerIds: [],
      engagementRate: [0, 300],
      conversionRate: [],
      costPerClick: [0, 100000],
      revenue: [0, 1000000],
      clicks: [0, 1000000],
      purchases: [0, 100000],
    });

    onFilter(null)
  };

  const handleFetchData = () => {
    Promise.all([
      getAllCampaigns(),
      getAllInfluencerInContent(),
    ])
      .then(([campaign, influencer]) => {
        setCampaigns(campaign?.data?.data);
        setInfluencers(influencer?.data?.data)
      })
  };

  useEffect(() => { handleFetchData() }, []);

  return (
    <div className="p-4 bg-white h-[600px] overflow-y-scroll rounded-lg shadow-md w-96">
      <h3 className="text-gray-700 font-medium mb-2">Posting date</h3>
      <div className="mb-4 flex gap-2">
        <DatePicker placeholder="Start date" className="w-full" value={formData.from} onChange={handleStartDateChange} />
        <DatePicker
          placeholder="End date"
          className="w-full"
          value={formData.to}
          onChange={handleEndDateChange}
          disabledDate={(current) => formData.from ? current.isBefore(formData.to) : false} />
      </div>

      <h3 className="text-gray-700 font-medium mb-2">Campaign</h3>
      <Select mode="multiple"
        maxTagCount={1}
        placeholder="Select option" className="w-full mb-4"
        value={formData.campaignIds}
        onChange={(value: string[]) => setFormData({ ...formData, campaignIds: value })}>
        {campaigns?.map(c => (
          <Option key={c.id} value={c.id}>{c.name}</Option>
        ))}
      </Select>

      <h3 className="text-gray-700 font-medium mb-2">Influencer</h3>
      <Select mode="multiple"
        maxTagCount={1}
        placeholder="Select option"
        className="w-full mb-4"
        value={formData.influencerIds}
        onChange={(value: string[]) => setFormData({ ...formData, influencerIds: value })}>
        {influencers?.map(c => (
          <Option key={c.id} value={c.id}>{c.name}</Option>
        ))}
      </Select>

      <h3 className="text-gray-700 font-medium mb-2">Conversion Rate</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['0 - 20%', '20 - 40%', '40 - 60%', '60 - 80%', '80 - 100%'].map((label) => (
          <Checkbox key={label} checked={formData.conversionRate.includes(label)} onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              conversionRate: e.target.checked ? [...prev.conversionRate, label] : prev.conversionRate.filter((item) => item !== label),
            }));
          }}>
            {label}
          </Checkbox>
        ))}
      </div>

      {[
        { key: 'engagementRate', label: 'Engagement Rate', min: 0, max: 300, suffix: '%', step: 10 },
        { key: 'costPerClick', label: 'Cost Per Click (CPC)', min: 0, max: 100000, suffix: '$', step: 10000 },
        { key: 'revenue', label: 'Revenue', min: 0, max: 1000000, suffix: '$', step: 10000 },
        { key: 'clicks', label: 'Clicks', min: 0, max: 1000000, suffix: '', step: 10000 },
        { key: 'purchases', label: 'Purchases', min: 0, max: 100000, suffix: '', step: 1000 }
      ].map(({ key, label, min, max, suffix, step }) => (
        <div key={key} className="mb-4">
          <h3 className="text-gray-700 font-medium mb-2">{label}</h3>
          <div className="flex items-center gap-2 w-full">
            <span>{suffix}{min}</span>
            <Slider
              range
              className="w-full"
              min={min}
              max={max}
              step={step}
              value={formData[key as keyof FormData] as number[]}
              onChange={(value: number[]) => setFormData({ ...formData, [key]: value })}
            />
            <span className='w-[40px] text-end '>{suffix}{formatNumber(max)}</span>
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-2 mt-4">
        <Button className="border-gray-300" onClick={handleReset}>
          Reset
        </Button>
        <Button type="primary" className="bg-blue-600" onClick={handleSubmit}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default memo(ModalFilterContent)

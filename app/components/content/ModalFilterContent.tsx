import React, {
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
import { initialFilterContent } from '~/constants/content.constant';
import { Campaign } from '~/models/Campaign.model';
import { FilterContentPayload } from '~/models/Content.model';
import { Creator } from '~/models/User.model';
import { formatNumber } from '~/utils/formatNumber';

const { Option } = Select;




type ModalFilterContentProps = {
  onFilter: (data: FilterContentPayload | null) => void;
  filter: FilterContentPayload;
};

const ModalFilterContent = ({ onFilter, filter }: ModalFilterContentProps) => {
  const [influencers, setInfluencers] = useState<Creator[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [formData, setFormData] = useState<FilterContentPayload>(filter);

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
    if (!formData.from || !formData.to) {
      message.error('Please select both start and end dates');
      return;
    }

    const payload = {
      ...formData,
      from: formData.from.toISOString(),
      to: formData.to.toISOString(),
    };
    onFilter(payload as any);
  };

  const handleReset = () => {
    const resetState: FilterContentPayload = initialFilterContent
    setFormData(resetState);
    onFilter(null);
  };

  const handleFetchData = () => {
    Promise.all([getAllCampaigns(), getAllInfluencerInContent()]).then(([campaign, influencer]) => {
      setCampaigns(campaign?.data?.data || []);
      setInfluencers(influencer?.data?.data || []);
    });
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="p-4 bg-white h-[600px] overflow-y-scroll rounded-lg shadow-md w-96">
      <h3 className="text-gray-700 font-medium mb-2">Posting date</h3>
      <div className="mb-4 flex gap-2">
        <DatePicker
          placeholder="Start date"
          className="w-full"
          value={formData.from}
          onChange={handleStartDateChange}
        />
        <DatePicker
          placeholder="End date"
          className="w-full"
          value={formData.to}
          onChange={handleEndDateChange}
        />
      </div>

      <h3 className="text-gray-700 font-medium mb-2">Campaign</h3>
      <Select
        mode="multiple"
        maxTagCount={1}
        placeholder="Select campaign"
        className="w-full mb-4"
        value={formData.campaignIds}
        onChange={(value) => setFormData({ ...formData, campaignIds: value })}
      >
        {campaigns?.map((c) => (
          <Option key={c.id} value={c.id}>
            {c.name}
          </Option>
        ))}
      </Select>

      <h3 className="text-gray-700 font-medium mb-2">Influencer</h3>
      <Select
        mode="multiple"
        maxTagCount={1}
        placeholder="Select influencer"
        className="w-full mb-4"
        value={formData.influencerIds}
        onChange={(value) => setFormData({ ...formData, influencerIds: value })}
      >
        {influencers?.map((i) => (
          <Option key={i.id} value={i.id}>
            {i.name}
          </Option>
        ))}
      </Select>

      <h3 className="text-gray-700 font-medium mb-2">Conversion Rate</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['0 - 20%', '20 - 40%', '40 - 60%', '60 - 80%', '80 - 100%'].map((label) => (
          <Checkbox
            key={label}
            checked={formData.conversionRate.includes(label)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                conversionRate: e.target.checked
                  ? [...prev.conversionRate, label]
                  : prev.conversionRate.filter((item) => item !== label),
              }))
            }
          >
            {label}
          </Checkbox>
        ))}
      </div>

      {[
        { key: 'engagementRate', label: 'Engagement Rate', min: 0, max: 300, suffix: '%', step: 10 },
        { key: 'costPerClick', label: 'Cost Per Click (CPC)', min: 0, max: 100000, suffix: '$', step: 10000 },
        { key: 'revenue', label: 'Revenue', min: 0, max: 1000000, suffix: '$', step: 10000 },
        { key: 'clicks', label: 'Clicks', min: 0, max: 1000000, suffix: '', step: 10000 },
        { key: 'purchases', label: 'Purchases', min: 0, max: 100000, suffix: '', step: 1000 },
      ].map(({ key, label, min, max, suffix, step }) => (
        <div key={key} className="mb-4">
          <h3 className="text-gray-700 font-medium mb-2">{label}</h3>
          <Slider
            range
            min={min}
            max={max}
            step={step}
            value={formData[key as keyof FilterContentPayload] as number[]}
            onChange={(value) => setFormData({ ...formData, [key]: value })}
            tooltip={{ formatter: (value) => `${formatNumber(value as number)}${suffix}` }}
          />
        </div>
      ))}

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={handleReset}>Reset</Button>
        <Button type="primary" onClick={handleSubmit}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default memo(ModalFilterContent);

import React from 'react';

import {
  Avatar,
  Breadcrumb,
  Collapse,
} from 'antd';
import Metric from '~/components/report/Metric';

import {
  Link,
  useLocation,
  useParams,
} from '@remix-run/react';

function InfluencerMetrics() {
  const location = useLocation()
  const params = useParams()

  const data = location?.state?.record
  const { Panel } = Collapse;


  if (!data) return <></>

  return (
    <div className='custom-report'>
      <Breadcrumb
        className='w-full border-b border-b-gray-100 pb-3'
        items={[
          {
            title: <Link onClick={() => localStorage.removeItem('campaignTab')}
              to={'/manager/campaigns'}>Campaigns</Link>
          },
          {
            title: <Link
              to={`/manager/${params.campaignId}`}>Campaigns Details</Link>
          },
          {
            title: <p className='text-gray-800'>{location?.state?.record?.creator?.name}</p>
          },
        ]}
      />

      <div className='mt-6'>
        <div className='flex items-center gap-3'>
          <Avatar className='w-9 h-9 object-cover' src={data?.creator?.avatarUrl || data?.creator?.instagramProfilePictureUrl} />
          <div>
            <h5 className='text-sm text-gray-800'>{data?.creator?.name}</h5>
            <p className='text-sm text-gray-500'>{data?.creator?.email}</p>
          </div>
        </div>

        {/* Metrics */}
        <Collapse defaultActiveKey={['1']} bordered={false} expandIconPosition="right">
          <Panel header="General Performance" key="1">
            <span className="text-gray-500">Quickly understand the overall status of your campaign.</span>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric loading={false} unit="$" data={data?.totalRevenue} title="Total Revenue" />
              <Metric loading={false} unit="$" data={data?.totalCost as number} title="Total Cost" />
            </div>
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={['2']} bordered={false} expandIconPosition="right">
          <Panel header="Social Media Metrics" key="2">
            <span className="text-gray-500">Evaluate audience reach and engagement across platforms.</span>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric unit="%" data={data?.engagementRate} loading={false} title="Engagement Rate" />
              <Metric unit="%" data={data?.commentRate} loading={false} title="Comment Rate" />
            </div>
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={['3']} bordered={false} expandIconPosition="right">
          <Panel header="Website Traffic Metric" key="3">
            <span className="text-gray-500">Understand where users are coming from, how long they stay, and bounce rates.</span>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric unit="" data={data?.totalClicks} loading={false} title="Product View" />
              <Metric unit="" data={data?.totalClicks as number} loading={false} title="Total Clicks" />
              <Metric unit="" data={data?.averageDuration} loading={false} title="Average Duration (min)" />
              <Metric unit="%" data={data?.bounceRate} loading={false} title="Bounced Rate" />
              <Metric unit="%" data={data?.ctr as number} loading={false} title="Click through rate" />
              <Metric unit="" data={9999} loading={false} title="View content" />
            </div>
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={['4']} bordered={false} expandIconPosition="right">
          <Panel header="Conversion Funnel Metrics" key="4">
            <span className="text-gray-500">Identify strengths and bottlenecks in the sales funnel and optimize conversion rates.</span>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric unit="%" data={data?.addToCart as number} loading={false} title="Add to cart rate" />
              <Metric unit="$" data={data?.costPerAddToCart as number} loading={false} title="Cost per add to cart" />
              <Metric unit="" data={data?.totalAddToCarts} loading={false} title="Total add to cart" />
              {/* <Metric unit="" data={data?.averageAddToCart} loading={false} title="Average add to cart" /> */}
              <Metric unit="%" data={data?.conversionRate} loading={false} title="Conversion Rate" />
              <Metric unit="%" data={data?.roi} loading={false} title="ROI (%)" />
              <Metric unit="$" data={data?.costPerClick} loading={false} title="Cost per click" />
              <Metric unit="$" data={data?.cpa} loading={false} title="CPA (Cost per acquisition)" />
              <Metric unit="" data={data?.totalOrders} loading={false} title="Total order" />
              <Metric unit="$" data={data?.averageOrder as number} loading={false} title="Average order  value" />
            </div>
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={['5']} bordered={false} expandIconPosition="right">
          <Panel header="Customer Behavior" key="5">
            <span className="text-gray-500">Gain deeper insights into customer behavior to enhance UX and increase sales.</span>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric unit="" data={data?.behavior as number} loading={false} title="Customer Behavior" />
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default InfluencerMetrics

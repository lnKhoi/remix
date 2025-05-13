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
              <Metric desc='Campaign revenue through URL link' loading={false} unit="$" data={data?.totalRevenue} title="Total revenue" />
              <Metric desc='Total campaign budget + Cost of product + Shipping fee' loading={false} unit="$" data={data?.totalCost as number} title="Total cost" />
            </div>
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={['2']} bordered={false} expandIconPosition="right">
          <Panel header="Social Media Metrics" key="2">
            <span className="text-gray-500">Evaluate audience reach and engagement across platforms.</span>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric desc='(Total Engagement ÷ Total Followers) x 100%' unit="%" data={data?.engagementRate} loading={false} title="Engagement rate (%)" />
              <Metric desc='(Comment count ÷ Post reach count) x 100%' unit="%" data={data?.commentRate} loading={false} title="Comment rate (%)" />
            </div>
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={['3']} bordered={false} expandIconPosition="right">
          <Panel header="Website Traffic Metric" key="3">
            <span className="text-gray-500">Understand where users are coming from, how long they stay, and bounce rates.</span>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric desc='Total unique clicks on URL link' unit="" data={data?.totalClicks as number} loading={false} title="Total Clicks" />
              <Metric desc='Total view product on shop page' unit="" data={data?.contentView} loading={false} title="View content" />
              <Metric desc='Total time clicks ÷ Total clicks' unit="" data={data?.averageDuration} loading={false} title="Average Duration (mins)" />
            </div>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric desc='Total cost ÷ Total clicks' unit="$" data={data?.costPerClick} loading={false} title="Cost per click" />
              <Metric desc='View content ÷ Total clicks x 100%' unit="%" data={data?.contentViewRate} title="View content rate (%)" loading={false} />
              <Metric desc='Total bounce ÷ Total clicks x 100%' unit="%" data={data?.bounceRate} loading={false} title="Bounced rate (%)" />
            </div>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric desc=' (Total clicks ÷ Impressions) x 100%' unit="%" data={data?.ctr as number} loading={false} title="Click through rate (%)" />
              <Metric desc='Total cost ÷ View content' unit="$" data={data?.costPerContentView} title="Cost per view content" loading={false} />
            </div>
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={['4']} bordered={false} expandIconPosition="right">
          <Panel header="Conversion Funnel Metrics" key="4">
            <span className="text-gray-500">Identify strengths and bottlenecks in the sales funnel and optimize conversion rates.</span>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric desc='The number of add to cart session based' unit="" data={data?.totalAddToCarts} loading={false} title="Total add to cart" />
              <Metric desc='Total number of orders on shopify ordered via url link' unit="" data={data?.totalOrders} loading={false} title="Total order" />
              <Metric desc='(Product price x Quantity) ÷ Total quantity' unit="$" data={data?.averageOrder as number} loading={false} title="Average order value" />
            </div>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric desc='Total add to cart ÷  Total clicks' unit="%" data={data?.addToCart as number} loading={false} title="Add to cart rate (%)" />
              <Metric desc='Total order ÷ Total clicks' unit="%" data={data?.conversionRate} loading={false} title="Conversion rate (%)" />
              <Metric desc='((Total revenue – Total cost) ÷ Total cost) x 100%' unit="%" data={data?.roi} loading={false} title="ROI (%)" />
            </div>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric desc='Total cost ÷ Total add to cart' unit="$" data={data?.costPerAddToCart as number} loading={false} title="Cost per add to cart" />
              <Metric desc='Total cost ÷ Total order' unit="$" data={data?.cpa} loading={false} title="CPA (Cost per acquisition)" />

            </div>
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={['5']} bordered={false} expandIconPosition="right">
          <Panel header="Customer Behavior" key="5">
            <span className="text-gray-500">Gain deeper insights into customer behavior to enhance UX and increase sales.</span>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Metric desc='Total order + Total Add to cart' unit="" data={data?.behavior as number} loading={false} title="Customer behavior" />
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default InfluencerMetrics

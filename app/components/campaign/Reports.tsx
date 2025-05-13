import React, {
  useEffect,
  useState,
} from 'react';

import {
  Collapse,
  Table,
  Tabs,
} from 'antd';
import { getInstagramStatistics } from '~/apis/campaign';
import {
  bounceAndDuration,
  getAverageOrder,
  getCampaignConversionRate,
  getCampaignROI,
  getCartInfo,
  getClickThroughRateInReport,
  getCostPerClicks,
  getCostPerConversion,
  getCpaInReport,
  getInfluencerInReport,
} from '~/apis/reports';
import {
  influencerPerformanceColumns,
  initialReport,
  ReportTab,
} from '~/constants/report.constant';
import { Campaign } from '~/models/Campaign.model';
import { ReportCampaign } from '~/models/report.model';

import { useParams } from '@remix-run/react';

import Metric from '../report/Metric';
import { DateRange } from '../ui/ModalSelectTimeRange';

type ReportsProps = {
  campaign: Campaign | null
  filter: { time: string, dateRange: DateRange }
}

function Reports({ campaign, filter }: ReportsProps) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('report-tab') || '1');
  const [loading, setLoading] = useState<boolean>(false)
  const [reportData, setReportData] = useState<ReportCampaign>(initialReport)

  const handleGetIGReport = async () => {
    setLoading(true)
    const [igStats, roi, conversionRate, costPerConversion, costperClicks, influencers, ctr, cpa, average, cartInfo, duration] = await Promise.all([
      getInstagramStatistics(id as string, filter),
      getCampaignROI(id as string, filter),
      getCampaignConversionRate(id as string, filter),
      getCostPerConversion(id as string, filter),
      getCostPerClicks(id as string, filter),
      getInfluencerInReport(id as string, filter),
      getClickThroughRateInReport(id as string, filter),
      getCpaInReport(id as string, filter),
      getAverageOrder(id as string, filter),
      getCartInfo(id as string, filter),
      bounceAndDuration(id as string, filter)
    ]).finally(() => setLoading(false))

    setReportData({
      ...reportData,
      roi: roi?.data?.roi,
      totalClicks: conversionRate?.data?.totalClicks,
      conversionRate: conversionRate?.data?.conversionRate,
      totalImpressions: igStats?.data?.totalImpressions,
      engagementRate: igStats?.data?.engagementRate,
      totalRevenue: roi.data?.totalRevenue,
      costPerConversion: costPerConversion?.data?.costPerConversion,
      costPerClicks: costperClicks?.data?.costPerClick,
      influencers: influencers?.data?.data,
      totalCost: roi?.data?.totalCost,
      totalCtr: ctr?.data?.crt,
      cpa: cpa?.data?.costPerAcquisition,
      totalPurchases: conversionRate?.data?.buyCount,
      averageOrder: average?.data?.averageOrder,
      addToCartPerClick: cartInfo?.data?.addToCartPerClick,
      costPerAddToCarts: cartInfo?.data?.costPerAddToCarts,
      customerBehavior: cartInfo?.data?.customerBehavior,
      bounceRate: duration?.data?.bounceRate,
      averageDuration: duration?.data?.averageDuration,
      averageAddToCart: cartInfo?.data?.averageAddToCart,
      totalAddToCarts: cartInfo?.data?.totalAddToCarts,
      commentRate: igStats?.data?.commentRate,
      contentView: duration?.data?.contentView,
      costPerContentView: duration?.data?.costPerContentView,
      contentViewRate: duration?.data?.contentViewRate
    })

  };

  useEffect(() => {
    if (filter?.time !== 'custom' || (filter?.dateRange?.[0] && filter?.time === 'custom')) {
      handleGetIGReport()
    }
  }, [filter.time, filter.dateRange])


  return (
    <div className='w-full custom-report'>
      <Tabs activeKey={activeTab} items={ReportTab} onChange={(e) => { setActiveTab(e); localStorage.setItem('report-tab', e) }} />
      {/* Campaign Performance */}
      {activeTab == '1' && (
        <div className=' -mt-3' >
          <Collapse defaultActiveKey={['1']} bordered={false} expandIconPosition="right">
            <Collapse.Panel header="General Performance" key="1">
              <span className="text-gray-500">Quickly understand the overall status of your campaign.</span>
              <div className="grid grid-cols-4 gap-5 mt-5">
                <Metric desc='Campaign revenue through URL link' unit="$" data={reportData.totalRevenue} title="Total revenue" loading={loading} />
                <Metric desc='Total campaign budget + Cost of product + Shipping fee' unit="$" data={reportData.totalCost as number} title="Total cost" loading={loading} />
              </div>
            </Collapse.Panel>
          </Collapse>

          <Collapse defaultActiveKey={['2']} bordered={false} expandIconPosition="right">
            <Collapse.Panel header="Social Media Metrics" key="2">
              <span className="text-gray-500">Evaluate audience reach and engagement across platforms.</span>
              <div className="grid grid-cols-4 gap-5 mt-5">
                <Metric desc='(Total Engagement ÷ Total Followers) x 100%' unit="%" data={reportData.engagementRate} title="Engagement rate (%)" loading={loading} />
                <Metric desc='(Comment count ÷ Post reach count) x 100%' unit="%" data={reportData.commentRate as number} title="Comment rate (%)" loading={loading} />
              </div>
            </Collapse.Panel>
          </Collapse>

          <Collapse defaultActiveKey={['3']} bordered={false} expandIconPosition="right">
            <Collapse.Panel header="Website Traffic Metric" key="3">
              <span className="text-gray-500">Understand where users are coming from, how long they stay, and bounce rates.</span>
              <div className="grid grid-cols-4 gap-5 mt-5">
                <Metric desc='Total unique clicks on URL link' unit="" data={reportData.totalClicks as number} title="Total clicks" loading={loading} />
                <Metric unit="" desc='Total view product on shop page' data={reportData.contentView} loading={false} title="View content" />
                <Metric desc='Total time clicks ÷ Total clicks' unit="" data={reportData.averageDuration} title="Average duration (mins)" loading={loading} />
              </div>
              <div className="grid grid-cols-4 gap-5 mt-5">
                <Metric desc='Total cost ÷ Total clicks' unit="$" data={reportData.costPerClicks} title="Cost per click" loading={loading} />
                <Metric desc='View content ÷ Total clicks x 100%' unit="%" data={reportData.contentViewRate} title="View content rate (%)" loading={loading} />
                <Metric desc='Total bounce ÷ Total clicks x 100%' unit="%" data={reportData.bounceRate} title="Bounced rate (%)" loading={loading} />
              </div>
              <div className="grid grid-cols-4 gap-5 mt-5">
                <Metric desc=' (Total clicks ÷ Impressions) x 100%' unit="%" data={reportData.totalCtr as number} title="Click through rate (%)" loading={loading} />
                <Metric desc='Total cost ÷ View content' unit="$" data={reportData?.costPerContentView as number} title="Cost per view content" loading={loading} />
              </div>
              <div className="grid grid-cols-4 gap-5 mt-5">
                {/* <Metric desc=' (Clicks ÷ Impressions) x 100%' unit="%" data={reportData.totalCtr as number} title="Click through rate (%)" loading={loading} /> */}
              </div>
            </Collapse.Panel>
          </Collapse>

          <Collapse defaultActiveKey={['4']} bordered={false} expandIconPosition="right">
            <Collapse.Panel header="Conversion Funnel Metrics" key="4">
              <span className="text-gray-500">Identify strengths and bottlenecks in the sales funnel and optimize conversion rates.</span>
              <div className="grid grid-cols-4 gap-5 mt-5">
                <Metric desc='The number of add to cart session based' unit="" data={reportData.totalAddToCarts as number} title="Total add to cart" loading={loading} />
                <Metric desc='Total number of orders on shopify ordered via url link' unit="" data={reportData.totalPurchases} title="Total order" loading={loading} />

                <Metric desc='(Product price x Quantity) ÷ Total quantity' unit="$" data={reportData.averageOrder as number} title="Average order value" loading={loading} />
              </div>
              <div className="grid grid-cols-4 gap-5 mt-5">
                <Metric desc='Total add to cart ÷  Total clicks' unit="%" data={reportData.addToCartPerClick as number} title="Add to cart rate (%)" loading={loading} />
                <Metric desc='Total order ÷ Total clicks' unit="%" data={reportData.conversionRate} title="Conversion rate (%)" loading={loading} />
                <Metric desc='((Total revenue – Total cost) ÷ Total cost) x 100%' unit="%" data={reportData.roi} title="ROI (%)" loading={loading} />
              </div>
              <div className="grid grid-cols-4 gap-5 mt-5">
                <Metric desc='Total cost ÷ Total add to cart' unit="$" data={reportData.costPerAddToCarts as number} title="Cost per add to cart" loading={loading} />
                <Metric desc='Total cost ÷ Total order' unit="$" data={reportData.cpa} title="CPA (Cost per acquisition)" loading={loading} />

              </div>
            </Collapse.Panel>
          </Collapse>
          <Collapse defaultActiveKey={['5']} bordered={false} expandIconPosition="right">
            <Collapse.Panel header="Customer Behavior" key="5">
              <span className="text-gray-500">Gain deeper insights into customer behavior to enhance UX and increase sales.</span>
              <div className="grid grid-cols-4 gap-5 mt-5">
                <Metric desc='Total order + Total Add to cart' unit="" data={reportData.customerBehavior as number} title="Customer behavior" loading={loading} />
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
      )}

      {/* Influencer Performance */}
      {activeTab == '2' && (
        <div>
          <h2 className='mt-3 text-2xl font-medium text-gray-800'>Influencer Performance</h2>
          <p className='text-sm mt-1 text-gray-700'>Manage your content and view their sales performance.</p>
          <div className='mt-6 cursor-pointer'>
            <Table
              columns={influencerPerformanceColumns({ loading, id: id ?? '' })}
              dataSource={
                loading
                  ? [1, 2, 3] as any
                  : reportData?.influencers
              } />
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports

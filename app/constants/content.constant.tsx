import React, { useState } from 'react';

// content.constant.tsx
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Menu,
  message,
  Skeleton,
  TableColumnsType,
  Tooltip,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import {
  rejectContentLink,
  reviewContent,
} from '~/apis/campaign';
import { approveContent } from '~/apis/content';
import ModalPostingDate from '~/components/content/ModalPostingDate';
import {
  Content,
  ContentFormat,
} from '~/models/Content.model';
import Editor from '~/plugins/editor';
import { ModalType } from '~/routes/_dash.manager.content.$id';
import { abbreviateLastName } from '~/utils/formatNumber';

import { EllipsisOutlined } from '@ant-design/icons';
import {
  CheckCircleIcon,
  FilmIcon,
  PlusCircleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';

import { DATE_TIME_FORMAT_V2 } from './time.constant';

type ContentColumnProps = {
  loading?: boolean;
  onRefresh: () => void
}

// Separate component for the action dropdown
const ActionDropdown: React.FC<{
  record: Content;
  onRefresh: () => void
}> = ({ record, onRefresh }) => {
  const [modalType, setModalType] = useState<ModalType>('')
  const [loadingReview, setLoadingReview] = useState<boolean>(false)
  const [reason, setReason] = useState<string>('')

  const handleApprove = async (campaignId: string, contentId: string, time: Dayjs) => {
    setLoadingReview(true)
    const date = dayjs(time).toISOString()

    approveContent(campaignId, contentId, true, date, '')
      .then((res) => {
        message.success('Content has been approved successfully')
        setModalType('')
        onRefresh()
      })
      .catch((err) => message.error(err.message))
      .finally(() => setLoadingReview(false))
  }

  const handleReject = async (): Promise<void> => {
    setLoadingReview(true);

    const isLinkRejection = record?.permalink && record.contentFormat == 'story';
    const rejectAction = isLinkRejection
      ? rejectContentLink(record.id, reason)
      : reviewContent(record.campaignId as string, record.id as string, reason, false);

    await rejectAction
      .then(() => {
        message.success('Content has been rejected successfully');
        onRefresh()
        setModalType('');
        setReason('');
      })
      .catch((err) => message.error(err.message))
      .finally(() => setLoadingReview(false))
  };

  const isReview = record.approved == 'pending' || record.approved == 'pending-review'

  return (
    <>
      <Dropdown
        overlay={
          <Menu>
            <Link to={`/manager/content/${record.id}`}>
              <Menu.Item key="view">View details</Menu.Item>
            </Link>
            {/* {isReview && (
              <>
                <Menu.Item
                  key="approve"
                  onClick={() => setModalType('confirm-posting-date')}
                >
                  Approve
                </Menu.Item>
                <Menu.Item
                  key="decline"
                  onClick={() => setModalType('reject-content')}
                >
                  Decline
                </Menu.Item>
              </>
            )} */}
            {record.permalink && (
              <Menu.Item
              >
                <span onClick={() => window.open(record.permalink, "_blank")}>
                  View on social
                </span>
              </Menu.Item>
            )}
          </Menu>
        }
        trigger={["click"]}
      >
        <EllipsisOutlined
          className="cursor-pointer text-lg"
          onClick={(e) => e.preventDefault()}
        />
      </Dropdown>

      {/* Modal Posting Date */}
      {isReview && (
        <ModalPostingDate
          open={modalType === 'confirm-posting-date'}
          onApproveContent={(time) => {
            handleApprove(record.campaignId, record.id, time)
          }}
          loading={loadingReview}
          onclose={() => setModalType('')}
        />
      )}

      {/* Modal Reject Content */}
      {isReview && (
        <Drawer
          footer={
            <div className="float-right gap-3 flex items-end  justify-between">
              <Button onClick={() => setModalType('')} >Cancel</Button>
              <Button loading={loadingReview} onClick={handleReject} type="primary">Reject</Button>
            </div>
          }
          width={600}
          title="Reject"
          open={modalType === 'reject-content'}
          onClose={() => setModalType('')}
        >
          <div style={{ width: '100%', height: 500, overflow: 'hidden' }}>
            <p className="text-sm font-normal my-5 mx-2 text-gray-500">
              Please let us know your reason for rejecting the post
            </p>
            <div style={{ width: '100%' }}>
              <Editor value={reason} onChange={(value) => setReason(value)} />
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
};

export const ContentsColumns = ({
  loading,
  onRefresh
}: ContentColumnProps): TableColumnsType<Content> => [
    {
      title: "Content image",
      dataIndex: "contentImage",
      key: "contentImage",
      fixed: "left",
      width: 80,
      render: (_, record: Content) => {
        const videoExtensions = ['mov', 'mp4'];
        const isVideo = record?.urls?.[0]?.slice(-3) && videoExtensions.includes(record.urls[0].slice(-3));

        return (
          <div className="w-[53px] h-[53px] bg-gray-300 rounded-md">
            {loading
              ? <Skeleton.Node active style={{ width: 53, height: 53, borderRadius: 12 }} />
              : isVideo
                ? <video
                  src={record?.urls?.[0]}
                  autoPlay
                  muted
                  controlsList="nodownload"
                  loop
                  className='w-full rounded-md h-full object-cover'
                />
                : <img
                  src={record?.urls?.[0]}
                  className='w-full rounded-md h-full object-cover'
                  alt="content"
                />
            }
            {!loading && (
              <div
                style={{ background: 'linear-gradient(135deg, #F9CE34 0%, #EE2A7B 51.44%, #6228D7 100%)' }}
                className='absolute cursor-pointer top-[4.3px] right-[6.5px] w-5 h-5 flex items-center justify-center rounded-[25px] '>
                <Tooltip title={getContentIcon(record.contentFormat as ContentFormat)?.desc}>
                {getContentIcon(record.contentFormat as ContentFormat)?.icon}
                </Tooltip>
              </div>
            )}
          </div>
        )
      }
    },
    {
      title: "Influencer name",
      dataIndex: "influencer",
      key: "influencer",
      fixed: "left",
      width: 180,
      render: (_, record: Content) => (
        <div className="flex items-center space-x-2">
          {loading
            ? <Skeleton.Node active style={{ width: 36, height: 36, borderRadius: 36 }} />
            : <Avatar
              className='w-9 h-9 object-cover rounded-[50%]'
              src={record?.creator?.avatarUrl}
            />}
          {loading ? <Skeleton.Input style={{ height: 20, width: 80 }} active /> : <span>{abbreviateLastName(record?.creator?.name as string, 20)}</span>}
        </div>
      ),
    },
    {
      title: "Campaign name",
      key: "campaignName",
      width: 200,
      render: (_, record: Content) => (
        <Link to={`/manager/${record.campaignId}`}>
          {loading ? <Skeleton.Input style={{ height: 20, width: 100 }} active /> : <p className='capitalize text-blue-500'>{abbreviateLastName(record?.campaign?.name, 25)}</p>}
        </Link>
      ),
    },
    {
      title: "Posting date",
      key: "postingDate",
      width: 150,
      render: (_, record: Content) => (
        <>
          {loading
            ? <Skeleton.Node style={{ height: 40 }} active />
            : <div className='capitalize items-center w-full  flex gap-3'>
              <p className='w-[80px] ' >  {record.post_due && dayjs(record.post_due).format(DATE_TIME_FORMAT_V2)}</p>
              {record.approved === 'posted' && (
                <Tooltip title='The content has been posted to social'>
                  <CheckCircleIcon className='w-5 cursor-pointer h-5 text-green-500' />
                </Tooltip>
              )}
            </div>}
        </>
      ),
    },
    {
      title: "Engagement Rate",
      align: 'center',
      key: "engagementRate",
      width: 150,
      render: (_, record) => (
        <>
          {loading ? <Skeleton.Node style={{ height: 40 }} active /> :
            <p>
              {record.engagementRate == null ? '---' : `${record.engagementRate.toFixed(2)}%`}
            </p>}
        </>
      ),
    },
    {
      title: "Revenue",
      key: "revenue",
      align: 'center',
      width: 150,
      render: (_, record) => (
        <>
          {loading ? <Skeleton.Node style={{ height: 40 }} active /> : <p> {record.totalRevenue == null ? '---' : `$${record.totalRevenue.toFixed(2)}`}</p>}
        </>
      ),
    },
    {
      title: "Clicks",
      key: "Clicks",
      width: 150,
      align: 'center',
      render: (_, record) => (
        <>
          {loading ? <Skeleton.Node style={{ height: 40 }} active /> : <p>{record?.totalClicks ?? '---'}</p>}
        </>
      ),
    },
    {
      title: "Cost Per Click (CPC)",
      key: "CPC",
      width: 180,
      align: 'center',
      render: (_, record) => (
        <>
          {loading ? <Skeleton.Node style={{ height: 40 }} active /> : <p>{record.costPerClick == null ? '---' : `$${record.costPerClick.toFixed(2)}`}</p>}
        </>
      ),
    },
    {
      title: "Purchases",
      key: "purchases",
      width: 150,
      align: 'center',
      render: (_, record) => (
        <>
          {loading ? <Skeleton.Node style={{ height: 40 }} active /> : <p>{record.totalPurchases ?? '---'}</p>}
        </>
      ),
    },
    {
      title: "Conversion Rate",
      key: "cr",
      width: 150,
      align: 'center',
      render: (_, record) => (
        <>
          {loading ? <Skeleton.Node style={{ height: 40 }} active /> : <p>{record.conversionRate == null ? '---' : `${record.conversionRate.toFixed(2)}%`}</p>}
        </>
      ),
    },
    {
      title: "Action",
      align: 'center',
      key: "action",
      fixed: "right",
      width: 50,
      render: (_, record: Content) => (
        <>
          {loading ? <Skeleton.Node style={{ maxWidth: 50, height: 20 }} active /> :
            <ActionDropdown
              record={record}
              onRefresh={onRefresh}
            />}
        </>
      ),
    },
  ];


const getContentIcon = (type: ContentFormat) => {
  switch (type) {
    case 'post':
      return { desc: 'Post', icon: <Squares2X2Icon className='w-4 h-4 text-white font-bold ' /> }
    case 'reel':
      return { desc: 'Reel', icon: <FilmIcon className='w-4 h-4 text-white  font-bold ' /> }
    case 'story':
      return { desc: 'Story', icon: <PlusCircleIcon className='w-4 h-4 font-bold text-white' /> }
    default:
      break;
  }
}
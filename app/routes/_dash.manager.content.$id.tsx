import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Breadcrumb,
  Button,
  DatePicker,
  Drawer,
  Input,
  message,
  Modal,
  Select,
  TimePicker,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import {
  getContentDetails,
  reviewContent,
} from '~/apis/campaign';
import {
  approveContent,
  publishContent,
} from '~/apis/content';
import Approve from '~/assets/approve.png';
import Reject from '~/assets/reject.png';
import EmbedContent from '~/components/content/EmbedContent';
import ModalPreviewContent from '~/components/content/ModalPreviewContent';
import ContentDetailSkeleton
  from '~/components/custom/skeletons/ContentDetailSkeleton';
import TagColor from '~/components/ui/tagColor';
import {
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT_V2,
} from '~/constants/time.constant';
import {
  ContentStatus,
  getColorStatusContent,
} from '~/helpers/campaign.helper';
import { Content } from '~/models/Content.model';
import Editor from '~/plugins/editor';
import {
  abbreviateLastName,
  formatName,
} from '~/utils/formatNumber';

import {
  CalendarDateRangeIcon,
  DocumentDuplicateIcon,
  ExclamationCircleIcon,
  LinkIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import { MetaFunction } from '@remix-run/cloudflare';
import {
  useNavigate,
  useParams,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Review Content' }]
}

const { TextArea } = Input
type ModalType = 'confirm-posting-date' | 'reject-influencer-request' | 'approve-influencer-request' | 'reject-content' | ''

const ContentDetails = () => {
  const { id } = useParams()
  const navigation = useNavigate()
  const [selectedVersion,setSelectedVersion] = useState('')

  const [reason, setReason] = useState<string>('')
  const [loading, setLoading] = useState<string>('')
  const [previewType, setPreviewType] = useState<string>('')
  const [isViewReason, setIsViewReason] = useState<boolean>(false)
  const [submitTime, setSubmitTime] = useState<Dayjs | null>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const [content, setContent] = useState<Content | null>(null)

  const [modalType, setModalType] = useState<ModalType>('')
  const minDateTime = dayjs(dayjs()).add(48, 'hour');

  const handleGetContentDetails = async () => {
    setLoading('loading')
    await getContentDetails(selectedVersion || id as string)
      .then((res) => setContent(res.data))
      .finally(() => setLoading(''))
  }

  useEffect(() => {
    handleGetContentDetails()
  }, [selectedVersion])

  const handleApproveContent = async (): Promise<void> => {
    setLoading('loading-post')
    const date = dayjs(submitTime).toISOString()

    await approveContent(content?.campaignId as string, content?.id as string, true, date, reason)
      .then(() => {
        handleGetContentDetails()
        toast.success('Content has been approved successfully')
        setModalType('')
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(''))
  }

  const handleReject = async (): Promise<void> => {
    setLoading('loading-reject')
    await reviewContent(content?.campaignId as string, content?.id as string, reason, false)
      .then(() => {
        setModalType('')
        setReason('')
        handleGetContentDetails()
        toast.success('Content has been reject successfully')
      })
      .finally(() => setLoading(''))
  }

  const handleConfirmInfluencerRequest = () => {
  }

  const handlePostContentToProfileInfluent = () => {
    setLoading('loading-post')
    publishContent(content?.id as string, 'instagram',)
      .then((res) => {
        toast.success('Content has been posted!')
        handleGetContentDetails()
      })
      .catch((err) => toast.error(`Posting Failed! ${err?.message}`))
      .finally(() => setLoading(''))
  }

  const contentPreview = 'https://ebo.vn/static/uploads/editor/100247_content-is-king.png'
  const videoExtensions = ['mov', 'mp4'];

  return (
    <div className='custom-select'>

      {contextHolder}
      <ToastContainer />
      <Breadcrumb
        className='fixed h-[40px] w-full '
        items={[
          { title: <div className='hover:text-gray-400 cursor-pointer  transition-all' onClick={() => navigation(-1)} >Contents</div>, },
          { title: <p className='text-gray-800'>Review Content</p> },
        ]}
      />
      {
        loading === 'loading'
          ? <ContentDetailSkeleton />
          : <>
            <div className='mx-auto w-full mt-16 justify-center flex items-start gap-7'>
              <div>
                <div className='w-[700px] border border-gray-200 shadow-sm rounded-xl '>
                  <div className='flex border-b border-b-gray-200 items-center justify-between'>
                    <div className='flex items-center p-4 gap-2'>
                      <Square3Stack3DIcon width={20} className='text-gray-800' />
                      <p>Deliverables</p>
                    </div>
                    <div className='flex p-4 items-center justify-between gap-3'>
                      <p>Version</p>
                      <Select
                        onChange={(v) => setSelectedVersion(v)}
                        defaultValue={content?.id}
                        className='bg-gray-200 w-[140px] rounded-lg'>
                        {content?.versions.map(v => (
                          <Select.Option value={v.contentId} >{v.version}</Select.Option>
                        ))}
                      </Select>
                      {content?.approved !== 'posted' && (
                        <Button onClick={() => setPreviewType('preview')} className='bg-gray-100'>Preview</Button>
                      )}
                    </div>
                  </div>
                  <div className='flex p-4 items-start mt-1 gap-3'>
                    <img className='w-[36px] h-[36px] rounded-[50%] object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7QkfjQ7yvMpDiPlgagN_hYtCrd2acymT1TDim7Kyt-WSAFhtXgHeZ_W0y_MAnxXtJqM&usqp=CAU" alt="avatar" />
                    <div className='flex flex-col items-start'>
                      <p className='text-sm font-medium text-gray-800'>{formatName(content?.creator.name as string)}</p>
                      <p className='text-gray-500 text-sm font-normal'>Submission date : {dayjs(content?.createdAt).format(DATE_TIME_FORMAT_V2)}</p>
                    </div>
                  </div>
                  <div className='px-4 pt-2 pb-4'>
                    <div className='flex items-center gap-2'>
                      {content?.urls.map((url, index) => {
                        const isVideo = videoExtensions.includes(url.slice(-3));

                        return isVideo ? (
                          <video
                            key={index}
                            autoPlay
                            loop
                            muted
                            controls
                            className='w-[120px] h-[120px] rounded-lg object-cover'
                            src={url}
                          />
                        ) : (
                          <img
                            key={index}
                            className='w-[120px] h-[120px] rounded-lg object-cover'
                            src={url || contentPreview}
                            alt="content"
                          />
                        );
                      })}
                    </div>
                    <p className='text-sm font-normal text-gray-500 mt-4'>{content?.caption} </p>
                  </div>
                </div>

                {/* Note */}
                {content?.notes !== '' && (
                  <div className='w-[700px] border border-gray-200 shadow-sm rounded-xl mt-5 p-5'>
                    <h5 className='text-sm text-gray-800'>Note</h5>
                    <p className='text-justify p-2 bg-gray-100 rounded-xl text-sm text-gray-800 mt-2'>{content?.notes}</p>
                  </div>
                )}
              </div>
              {/* Review */}

              <div className='flex flex-col gap-5 w-[400px]'>

                {/* Influencer Requested */}
                <div className='w-full border border-gray-100 rounded-xl shadow-sm'>
                  <p className='p-4 text-sm text-gray-800 '>Please review the attached content for approval. Looking forward to your feedback!</p>
                  <div className='w-full justify-between px-4 pb-4 flex items-center gap-2 '>
                    {content?.approved == 'pending' ? (
                      <>
                        <Button onClick={() => setModalType('reject-content')} className='w-1/2' type='default' >Reject</Button>
                        <Button onClick={() => setModalType('confirm-posting-date')} className='w-1/2' type='primary' >Approve</Button>
                      </>
                    ) : (
                      <TagColor
                        status={getColorStatusContent(content?.approved as ContentStatus)?.status as string}
                        color={getColorStatusContent(content?.approved as ContentStatus)?.color as ContentStatus}
                        background={getColorStatusContent(content?.approved as ContentStatus)?.background as ContentStatus} />
                    )}
                  </div>
                  <div className='bg-gray-100  flex gap-3 items-center p-4 justify-start'>
                    <ExclamationCircleIcon width={20} className='text-gray-500' />
                    <p className='w-[224px] text-sm text-gray-800'>Content approval time within 48 hours from submission for review</p>
                  </div>
                </div>

                {/* Reason */}
                {content?.approved === 'rejected' && (
                  <div className='p-4 border w-full border-gray-200 rounded-xl flex flex-col gap-4'>
                    <span className='text-sm font-medium text-gray-800'>Reason</span>
                    <p className='text-sm font-normal text-gray-800'>Your feedback has been sent to Influencer. You couldn’t edit reason or undo.</p>
                    <Button onClick={() => setIsViewReason(true)} className='w-[100px] bg-gray-100 border-none'>View Details</Button>
                  </div>
                )}
                {/* Link Content */}
                {content?.approved === 'approved' && (
                  <div className='w-full border border-gray-200 rounded-xl shadow-sm'>
                    <div className='flex items-start pt-4  px-3  pb-3 gap-3'>
                      <CalendarDateRangeIcon width={20} height={20} className='text-gray-500' />
                      <div className='flex flex-col gap-1 w-full'>
                        <p className='text-sm font-normal text-gray-500'>Posting date</p>
                        <p className='text-gray-800 text-sm'>{dayjs(content.post_due).format(DATE_TIME_FORMAT_V2)}</p>
                      </div>
                    </div>
                    <div onClick={handlePostContentToProfileInfluent} className='w-full px-5 pb-4'>
                      <Button loading={loading === 'loading-post'} disabled={loading === 'loading-post'} className='w-full' type='primary'>Post to social</Button>
                    </div>
                  </div>
                )}
                {/* Link website */}
                {content?.trackingUrl && (
                  <div className='w-full border border-gray-100 rounded-xl shadow-sm'>
                    <div className='flex items-start p-4 gap-3'>
                      <LinkIcon width={20} height={20} className='text-gray-500' />
                      <div className='flex flex-col gap-1 w-full'>
                        <p className='text-sm font-normal text-gray-500'>Link Product</p>
                        <CopyToClipboard
                          onCopy={() => messageApi.success('Copied to clipboard!')}
                          text={content?.trackingUrl}
                        >
                          <div className='flex cursor-pointer items-center gap-2 justify-between w-full'>
                            <p className='text-gray-800 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>{abbreviateLastName(content?.trackingUrl, 45)}</p>
                            <DocumentDuplicateIcon width={20} height={20} className='text-gray-500 min-w-[20px]' />
                          </div>
                        </CopyToClipboard>
                      </div>
                    </div>

                  </div>
                )}

                {/* IG POST LINK */}
                {content?.approved === 'posted' && (
                  <div className='w-full border border-gray-100 rounded-xl shadow-sm'>
                    <div className='flex items-start p-4 gap-3'>
                      <div className='flex flex-col gap-1 w-full'>
                        <p className='text-sm font-normal text-gray-900'>Instagram Post Link</p>
                        <p onClick={() => window.open(content?.permalink, "_blank")} className='text-blue-500 font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap'>
                          {content?.permalink}
                        </p>
                      </div>
                    </div>
                  </div>

                )}
                {/* Embed Post */}
                <EmbedContent link={content?.permalink as string} />
              </div>

              {/* Modal Reject content*/}
              <Drawer
                footer={
                  <div className="float-right gap-3 flex items-end  justify-between">
                    <Button onClick={() => setModalType('')} >Cancel</Button>
                    <Button loading={loading === 'loading-reject'} onClick={handleReject} type="primary">Reject</Button>
                  </div>
                }
                width={600}
                title="Reject"
                open={modalType === 'reject-content'}
                onClose={() => setModalType('')}
              >
                <p className="text-sm font-normal my-5 mx-2 text-gray-500">
                  Please let us know your reason for rejecting the post
                </p>
                <Editor value={reason} onChange={(value) => setReason(value)} />
              </Drawer>

              {/* Modal Reject Influencer request */}
              <Modal
                width={355}
                onOk={handleReject}
                open={modalType === 'reject-influencer-request'}
                onCancel={() => setModalType('')} title=''
                footer={() =>
                  <div className='w-full mt-7 flex items-center justify-between'>
                    <Button onClick={() => setModalType('')} className='w-[49%]'>No</Button>
                    <Button onClick={handleConfirmInfluencerRequest} className='text-white w-[49%]' >Yes</Button>
                  </div>
                }
              >
                <div className='flex items-center flex-col -mt-4 justify-center'>
                  <img src={Reject} className='h-[130px] object-contain' alt="" />
                  <p className='text-sm text-gray-600 -mt-4'>Are you sure you want to reject this request?</p>
                </div>
              </Modal>

              {/* Modal Approve Influencer Requeset */}
              <Modal
                width={355}
                onOk={handleReject}
                open={modalType === 'approve-influencer-request'}
                onCancel={() => setModalType('')} title=''
                footer={() =>
                  <div className='w-full mt-7 flex items-center justify-between'>
                    <Button onClick={() => setModalType('')} className='w-[49%]'>No</Button>
                    <Button type='primary' onClick={handleConfirmInfluencerRequest} className='text-white w-[49%]' >Yes</Button>
                  </div>
                }
              >
                <div className='flex items-center flex-col -mt-4 justify-center'>
                  <img src={Approve} className='h-[130px] object-contain' alt="" />
                  <p className='text-sm text-gray-600 -mt-4'>Are you sure you want to approve this request?</p>
                </div>
              </Modal>

              {/* Modal Posting Date */}
              <Modal
                width={355}
                confirmLoading={loading === 'loading-post'}
                onOk={handleApproveContent}
                open={modalType === 'confirm-posting-date'}
                onCancel={() => setModalType('')} title=''>
                <div className='flex items-center flex-col justify-center mb-8'>
                  <h2 className='text-xl font-semibold text-gray-800'>Posting Date</h2>
                  <p className='text-sm text-center text-gray-800 mt-1'>The date content goes live on influender's social media platforms.</p>
                </div>
                <div className='flex flex-col gap-2 pb-3'>
                  <span className='text-sm font-semibold text-gray-800 text-left'>Posting Date</span>
                  <DatePicker
                    onChange={(date) =>
                      setSubmitTime((prev) => {
                        const time = prev ? prev : dayjs();
                        return dayjs(date).set('hour', time.hour()).set('minute', time.minute());
                      })
                    }
                    disabledDate={(current) => current && current < minDateTime.startOf('day')}
                    style={{ width: '100%' }}
                    format={DATE_TIME_FORMAT}
                  />
                  <span className='text-sm font-semibold text-gray-800 mt-3 text-left'>Time</span>
                  <TimePicker
                    onChange={(time) =>
                      setSubmitTime((prev) => {
                        const date = prev ? prev : dayjs();
                        return dayjs(date).set('hour', time.hour()).set('minute', time.minute());
                      })
                    }
                    disabledHours={() => {
                      const selectedDate = submitTime ? dayjs(submitTime) : null;
                      if (selectedDate && selectedDate.isSame(minDateTime, 'day')) {
                        return [...Array(24).keys()].filter((hour) => hour < minDateTime.hour());
                      }
                      return [];
                    }}
                    disabledMinutes={(selectedHour) => {
                      // Disable minutes if the selected hour is the same as minDateTime's hour
                      const selectedDate = submitTime ? dayjs(submitTime) : null;
                      if (
                        selectedDate &&
                        selectedDate.isSame(minDateTime, 'day') &&
                        selectedHour === minDateTime.hour()
                      ) {
                        return [...Array(60).keys()].filter((minute) => minute < minDateTime.minute());
                      }
                      return [];
                    }}
                    style={{ width: '100%' }}
                    format="HH:mm"
                  />
                </div>
              </Modal>

              {/* Modal Preview Content */}
              <ModalPreviewContent
                content={content as Content} open={previewType === 'preview'}
                onClose={() => setPreviewType('')} />

              <Drawer
                footer={
                  <div className='flex items-center justify-end mr-7'><Button onClick={() => setIsViewReason(false)}>Close</Button></div>
                }
                title='Reason'
                width={650}
                open={isViewReason}
                onClose={() => setIsViewReason(false)}>
                <Editor showToolbar={false} value={content?.reason as string} />
              </Drawer>
            </div>
          </>
      }

    </div>
  );
};

export default ContentDetails;

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
  Input,
  message,
  Modal,
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
import { approveContent } from '~/apis/content';
import Approve from '~/assets/approve.png';
import Reject from '~/assets/reject.png';
import TagColor from '~/components/ui/tagColor';
import { DATE_TIME_FORMAT_V2 } from '~/constants/time.constant';
import {
  ContentStatus,
  getColorStatusContent,
} from '~/helpers/campaign.helper';
import { Content } from '~/models/Content.model';

import {
  CalendarDateRangeIcon,
  ChevronUpDownIcon,
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

  const [reason, setReason] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [submitTime, setSubmitTime] = useState<Dayjs | null>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const [content, setContent] = useState<Content | null>(null)

  const [modalType, setModalType] = useState<ModalType>('')

  const handleGetContentDetails = async () => {
    await getContentDetails(id as string).then((res) => setContent(res.data))
  }

  useEffect(() => {
    handleGetContentDetails()
  }, [])

  const handleApproveContent = async (): Promise<void> => {
    setLoading(true)
    const date = dayjs(submitTime).toISOString()

    await approveContent(content?.campaignId as string, content?.id as string, true, date, reason)
      .then(() => {
        handleGetContentDetails()
        toast.success('Content has been approved successfully')
        setModalType('')
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }

  const handleReject = async (): Promise<void> => {
    await reviewContent(content?.campaignId as string, content?.id as string, reason, false)
      .then(() => {
        setModalType('')
        setReason('')
        handleGetContentDetails()
        toast.success('Content has been reject successfully')
      })
  }

  const handleConfirmInfluencerRequest = () => {

  }

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
                <button className='bg-[#F3F4F6] px-3 justify-between flex items-center px hover:bg-[#D1D5DB] transition-all text-sm h-[36px] w-[125px] font-normal rounded-[9px] text-[#1F2937]'>
                  {dayjs(content?.createdAt).format('DD/MM/YYYY')}
                  <ChevronUpDownIcon width={16} />
                </button>
              </div>
            </div>
            <div className='flex p-4 items-start mt-1 gap-3'>
              <img className='w-[36px] h-[36px] rounded-[50%] object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7QkfjQ7yvMpDiPlgagN_hYtCrd2acymT1TDim7Kyt-WSAFhtXgHeZ_W0y_MAnxXtJqM&usqp=CAU" alt="avatar" />
              <div className='flex flex-col items-start'>
                <p className='text-sm font-medium text-gray-800'>{content?.creator.name}</p>
                <p className='text-gray-500 text-sm font-normal'>Submission date : {dayjs(content?.createdAt).format(DATE_TIME_FORMAT_V2)}</p>
              </div>
            </div>
            <div className='px-4 pt-2 pb-4'>
              <img className='w-[120px] h-[120px] rounded-lg object-cover' src="https://chipchipweb.com/media/data/images/140705-noi-dung-chi-tiep-thi-khong-mang-lai-hieu-qua-Digilever.jpg" alt="content" />
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
        <div className='flex flex-col gap-5 w-[300px]'>
          {/* Influencer Requested */}
          {/* <div className='border border-blue-500 rounded-xl p-4'>
            <h5 className='text-sm text-gray-800 font-medium'>Influencer requested</h5>
            <p className='mt-5 text-sm font-normal text-gray-500'>Submission date:</p>
            <p className='text-sm text-gray-500 font-medium'>22/09/2024</p>
            <p className='text-sm mt-3 text-gray-500 font-medium'>Reason</p>
            <p className='text-sm mt-2 text-gray-800 font-normal'>It is along established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <div className='mt-10 flex items-center gap-2'>
              <Button onClick={() => setModalType('reject-influencer-request')} className='w-1/2' type='default' >Reject</Button>
              <Button onClick={() => setModalType('approve-influencer-request')} className='w-1/2' type='primary' >Approve</Button>
            </div>
          </div> */}
          <div className='w-[300px] border border-gray-100 rounded-xl shadow-sm'>
            <p className='p-4 text-sm text-gray-800 '>Please review the attached content for approval. Looking forward to your feedback!</p>
            <div className='w-full px-4 pb-4 pt-2 flex items-center gap-2 '>
              {content?.approved === 'pending' ? (
                <>
                  <Button onClick={() => setModalType('reject-content')} className='w-1/2' type='default' >Reject</Button>
                  <Button onClick={() => setModalType('confirm-posting-date')} className='w-1/2' type='primary' >Approve</Button>
                </>
              ) : (
                <TagColor
                  status={content?.approved as string}
                  color={getColorStatusContent(content?.approved as ContentStatus)?.color as ContentStatus}
                  background={getColorStatusContent(content?.approved as ContentStatus)?.background as ContentStatus} />
              )}
            </div>
            <div className='bg-gray-100  flex gap-3 items-center p-4 justify-center'>
              <ExclamationCircleIcon width={20} className='text-gray-500' />
              <p className='w-[224px] text-sm text-gray-800'>Content approval time within 48 hours from submission for review</p>
            </div>
          </div>
          {/* Reason */}
          {content?.approved === 'rejected' && (
            <div className='p-4 border w-[300px] border-gray-200 rounded-xl flex flex-col gap-4'>
              <span className='text-sm font-medium text-gray-800'>Reason</span>
              <p className='text-sm font-medium text-gray-800'>{content?.reason}</p>
            </div>
          )}
          {/* Link Content */}
          <div className='w-[300px] border border-gray-200 rounded-xl shadow-sm'>
            {/* <div className='flex items-start p-4 gap-3'>
              <LinkIcon width={20} height={20} className='text-gray-500' />
              <div className='flex flex-col gap-1 w-full'>
                <p className='text-sm font-normal text-gray-500'>Link content</p>
                <CopyToClipboard onCopy={() => messageApi.success('Coppied to clipboard!')} text='abcdfsdfsd'>
                  <div className='flex cursor-pointer items-center gap-2 justify-between w-full'>
                    <p className='text-gray-800 text-sm'>Https://shoptify.com.abc</p>
                    <DocumentDuplicateIcon width={20} height={20} className='text-gray-500' />
                  </div>
                </CopyToClipboard>
              </div>
            </div> */}
            <div className='flex items-start pt-4  px-3  pb-3 gap-3'>
              <CalendarDateRangeIcon width={20} height={20} className='text-gray-500' />
              <div className='flex flex-col gap-1 w-full'>
                <p className='text-sm font-normal text-gray-500'>Posting date</p>
                <p className='text-gray-800 text-sm'>20/09/2024</p>
              </div>
            </div>
          </div>

          {/* Link website */}
          {content?.trackingUrl && (
            <div className='w-[300px] border border-gray-100 rounded-xl shadow-sm'>
              <div className='flex items-start p-4 gap-3'>
                <LinkIcon width={20} height={20} className='text-gray-500' />
                <div className='flex flex-col gap-1 w-full'>
                  <p className='text-sm font-normal text-gray-500'>Link website</p>
                  <CopyToClipboard
                    onCopy={() => messageApi.success('Copied to clipboard!')}
                    text={content?.trackingUrl}
                  >
                    <div className='flex cursor-pointer items-center gap-2 justify-between w-full'>
                      <p className='text-gray-800 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>{content?.trackingUrl}</p>
                      <DocumentDuplicateIcon width={20} height={20} className='text-gray-500' />
                    </div>
                  </CopyToClipboard>
                </div>
              </div>

              <div className='bg-gray-100 flex gap-3 items-center p-4 justify-center'>
                <ExclamationCircleIcon width={20} className='text-gray-600' />
                <p className='w-[224px] text-sm text-gray-800'>Product link will be attached once the content is approved and sent to the influencer.</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Reject content*/}
        <Modal
          width={355}
          open={modalType === 'reject-content'}
          onCancel={() => setModalType('')} title=''
          footer={() =>
            <div className='w-full mt-7 flex items-center justify-between'>
              <Button onClick={() => setModalType('')} className='w-[49%]'>Cancel</Button>
              <Button onClick={handleReject} className='text-white bg-red-500  w-[49%]' >Reject</Button>
            </div>
          }
        >
          <div className='flex items-center flex-col justify-center'>
            <h2 className='text-xl font-semibold text-gray-800'>Reject</h2>
            <p className='text-sm text-center text-gray-800 mt-1'>Please let us know your reason for rejecting the post</p>
            <TextArea rows={4} onChange={(e) => setReason(e.target.value)} className='mt-5' placeholder='Reason...' />
          </div>
        </Modal>

        {/* Modal Reject Influencer request */}
        <Modal
          width={355}
          onOk={handleReject}
          open={modalType === 'reject-influencer-request'}
          onCancel={() => setModalType('')} title=''
          footer={() =>
            <div className='w-full mt-7 flex items-center justify-between'>
              <Button onClick={() => setModalType('')} className='w-[49%]'>No</Button>
              <Button onClick={handleConfirmInfluencerRequest} className='text-white bg-red-500  w-[49%]' >Yes</Button>
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
          confirmLoading={loading}
          onOk={handleApproveContent}
          open={modalType === 'confirm-posting-date'}
          onCancel={() => setModalType('')} title=''>
          <div className='flex items-center flex-col justify-center mb-8'>
            <h2 className='text-xl font-semibold text-gray-800'>Posting Date</h2>
            <p className='text-sm text-center text-gray-800 mt-1'>The date content goes live on influender's social media platforms.</p>
          </div>
          <div className='flex flex-col gap-2'>
            <span className=' text-sm font-semibold text-gray-800  text-left'>Posting Date</span>
            <DatePicker
              onChange={(e) => setSubmitTime(e)}
              disabledDate={(current) => { return current && current < dayjs().endOf('day'); }}
              style={{ width: '100%' }}
              showTime
              format={DATE_TIME_FORMAT_V2} />
          </div>
        </Modal>

      </div>
    </div>

  );
};

export default ContentDetails;

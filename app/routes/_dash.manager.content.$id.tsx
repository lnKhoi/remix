import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Breadcrumb,
  Button,
  Input,
  Modal,
} from 'antd';
import dayjs from 'dayjs';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import {
  getContentDetails,
  reviewContent,
} from '~/apis/campaign';
import Warning from '~/assets/warning.png';
import { DATE_TIME_FORMAT_V2 } from '~/constants/time.constant';
import { Content } from '~/models/Content.model';

import {
  ChevronUpDownIcon,
  ExclamationCircleIcon,
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
const ContentDetails = () => {
  const { id } = useParams()
  const navigation = useNavigate()
  const [reason,setReason] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [content, setContent] = useState<Content | null>(null)

  const handleGetContentDetails = async () => {
    getContentDetails(id as string).then((res) => setContent(res.data))
  }

  useEffect(() => {
    handleGetContentDetails()
  }, [])

  const handleApproveContent = async () => {
    await reviewContent(content?.campaignId as string, content?.id as string, '', true)
      .then(() => {
        handleGetContentDetails()
        toast.success('Content has been approved successfully')
      })
  }

  const handleReject = async () => {
    await reviewContent(content?.campaignId as string, content?.id as string, reason, false)
    .then(() => {
      setModal(false)
      setReason('')
      handleGetContentDetails()
      toast.success('Content has been reject successfully')
    })
  }

  return (
    <div className='custom-select'>
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
          <div className='w-[700px] border border-gray-200 shadow-sm rounded-lg '>
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
          <div className='w-[700px] border border-gray-200 shadow-sm rounded-lg mt-5 p-5'>
            <h5 className='text-sm text-gray-800'>Note</h5>
            <p className='text-justify p-2 bg-gray-100 rounded-md text-sm text-gray-800 mt-2'>It is along asfasdfsdafsdafdsafsdafsdafsdafsdaf</p>
          </div>
        </div>
        {/* Review */}
        {content?.approved === 'pending' && (
          <div className='w-[300px] border border-gray-100 rounded-lg shadow-sm'>
            <p className='p-4 text-sm text-gray-800 '>Please review the attached content for approval. Looking forward to your feedback!</p>
            <div className='w-full px-4 pb-4 pt-2 flex items-center gap-2 '>
              <Button onClick={() => setModal(true)} className='w-1/2' type='default' >Reject</Button>
              <Button onClick={handleApproveContent} className='w-1/2' type='primary' >Approve</Button>
            </div>
            <div className='bg-gray-100  flex gap-3 items-center p-4 justify-center'>
              <ExclamationCircleIcon width={20} className='text-gray-500' />
              <p className='w-[224px] text-sm text-gray-800'>Content approval time within 48 hours from submission for review</p>
            </div>
          </div>
        )}
        {/* Modal Reject */}
        <Modal onOk={handleReject} open={modal} onCancel={() => setModal(false)} title=''>
          <div className='flex items-center flex-col justify-center'>
            <img src={Warning} className='h-[130px] object-contain' alt="" />
            <TextArea onChange={(e) => setReason(e.target.value)} className='mt-4' placeholder='Reason...' />
          </div>
        </Modal>

      </div>
    </div>

  );
};

export default ContentDetails;

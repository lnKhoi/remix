import React, {
  useEffect,
  useState,
} from 'react';

import {
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Modal,
  Segmented,
} from 'antd';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import { getCampaignDetails } from '~/apis/campaign';
import CampaignDetails from '~/components/campaign/CampaignDetails';
import Content from '~/components/campaign/Content';
import Influencer from '~/components/campaign/Influencer';
import InviteCard from '~/components/campaign/InviteCard';
import Reports from '~/components/campaign/Reports';
import { Campaign } from '~/models/Campaign.model';

import { UserPlusIcon } from '@heroicons/react/24/outline';
import {
  Link,
  MetaFunction,
  useParams,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Campaign Details' }];
};

type Tab = 'Campaign Details' | 'Influencer' | 'Content' | 'Reports';

function page() {
  const { id } = useParams();
  const [tab, setTab] = useState<Tab>('Campaign Details');
  const [modalInvite, setModalInvite] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  const handleGetCampaignDetails = async (): Promise<void> => {
    await getCampaignDetails(id as string)
      .then((res) => setCampaign(res.data))
      .catch((err) => toast.error(err?.message));
  };

  const getCampaignTab = () => {
    switch (tab) {
      case 'Campaign Details':
        return <CampaignDetails campaign={campaign} />;
      case 'Influencer':
        return <Influencer campaign={campaign} />;
      case 'Content':
        return <Content campaign={campaign} />;
      case 'Reports':
        return <Reports campaign={campaign} />;
      default:
        break;
    }
  };

  useEffect(() => {
    handleGetCampaignDetails();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className='fixed w-full'>
        <div className='relative h-[60px] items-center -ml-5 border-b border-b-gray-200 bg-white z-40 -mt-5  w-[calc(100%-200px)] px-8 flex  justify-between'>
          <Breadcrumb
            className='w-[200px]'
            items={[
              { title: <Link to={'/manager/campaigns'}>Campaigns</Link> },
              { title: <p className='text-gray-800'>{campaign?.name}</p> },
            ]}
          />

          <Button
            onClick={() => setModalInvite(true)}
            className='bg-gray-100 hover:bg-gray-400 border-gray-100'
            type='text'
          >
            <div className='flex items-center gap-1'>
              <UserPlusIcon className='bg-gray-100' width={20} />
              Invite Influencer
            </div>
          </Button>
        </div>
      </div>
      <div className='mt-14'>
        <Segmented
          className='fixed z-50'
          defaultValue={tab}
          style={{ marginBottom: 8 }}
          onChange={(value) => setTab(value as Tab)}
          options={[
            { label: 'Campaign Details', value: 'Campaign Details' },
            { label: 'Influencer', value: 'Influencer' },
            {
              label: (
                <div className='flex items-center'>
                  Content <Badge  color='#EF4444' size='small' className='ml-1' count={14}></Badge>
                </div>
              ),
              value: 'Content',
            },
            { label: 'Reports', value: 'Reports' },
          ]}
        />
        <div className='pt-14'>{getCampaignTab()}</div>
      </div>

      {/* Modal Invite Influencer */}
      <Modal
        width={650}
        title='Invite Influencer'
        open={modalInvite}
        onCancel={() => setModalInvite(false)}
        footer={[
          <div className='flex border-t border-t-gray-300 pt-5 items-center justify-end gap-2'>
            <Button type='default'>Close</Button>
            <Button type='primary'>Send Invitation</Button>
          </div>,
        ]}
      >
        <div>
          <h5 className='text-[#374151] text-center'>
            Invite your Influencer to review collaborate on this campaign.
          </h5>
          <div className='flex mt-8 items-center justify-between'>
            <Checkbox>Select All</Checkbox>
            <p className='text-[#1F2937] text-sm'>Already in this campaign (0)</p>
          </div>
          <div className='h-[330px] mb-8 mt-4 pr-2 overflow-y-scroll w-full flex flex-col gap-3'>
            <InviteCard />
            {/* Add more InviteCards as needed */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default page;

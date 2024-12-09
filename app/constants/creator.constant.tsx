import {
  Skeleton,
  TableColumnsType,
  TableProps,
} from 'antd';
import DefaultAvatar from '~/assets/avatar.jpeg';
import Fb from '~/assets/facebook.svg';
import Ig from '~/assets/insta.svg';
import Tiktok from '~/assets/tiktok.svg';
import TagColor from '~/components/ui/tagColor';
import { getColorInfluencerContent } from '~/helpers/campaign.helper';
import {
  Creator,
  InfluencerContentStatus,
  InfluencerInCampaign,
} from '~/models/User.model';
import { formatName } from '~/utils/formatNumber';

export const creatorColumns: TableProps<Creator>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'hasAccount',
    key: 'hasAccount',
    render: (text) => {
      const registered = text === 1
      return (
        <div className={`inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px]  ${registered ? 'bg-teal-100' : 'bg-red-100'} `}>
          <div className={` w-2 h-2 rounded-[50%] ${registered ? 'bg-teal-700' : 'bg-red-700'}`}></div>
          <span className={`text-[12px] capitalize ${registered ? 'text-teal-700' : 'text-red-700'}`}>{registered ? 'Registered' : 'Not Registered'}</span>
        </div>
      )
    }
  },
];

export const influencerColumn: TableProps<Creator>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      const isActive = text === 'registered'
      return (
        <div className={`inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px]  ${isActive ? 'bg-teal-100' : 'bg-red-100'} `}>
          <div className={` w-2 h-2 rounded-[50%] ${isActive ? 'bg-teal-700' : 'bg-red-700'}`}></div>
          <span className={`text-[12px] capitalize ${isActive ? 'text-teal-700' : 'text-red-700'}`}>{text}</span>
        </div>
      )
    }
  },
];



export const socials = [
  {
    name: 'facebook',
    icon: Fb
  },
  {
    name: 'instagram',
    icon: Ig
  },
  // {
  //   name: 'youtube',
  //   icon: Yb
  // },
  {
    name: 'tiktok',
    icon: Tiktok
  }
]

type ColumnsProps = {
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
  loading: boolean
};

export const influencersParticipantsColumns = ({
  handleApprove,
  handleReject,
  loading
}: ColumnsProps): TableColumnsType<InfluencerInCampaign> => [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {loading
            ? <>
              <Skeleton.Avatar active shape='circle' style={{ width: 30, height: 30 }} />
              <Skeleton.Input active size='small' />
            </>
            : <>
              <img
                className="w-[30px] h-[30px] rounded-[50%] object-cover"
                src={record.creator.avatarUrl || DefaultAvatar}
                alt="avatar"
              />
              {formatName(record?.creator?.name as string)}
            </>}
        </div>
      ),
    },
    {
      title: 'Participants',
      dataIndex: 'Participants',
      render: () => <div>
        {loading ? <Skeleton.Input active size='small' /> : 'Invite'}
      </div>,
    },
    {
      title: 'Instagram',
      dataIndex: 'instagram',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => {
        const color = getColorInfluencerContent(status as InfluencerContentStatus);
        return <>
          {loading
            ? <Skeleton.Button active style={{ borderRadius: 50, height: 28, width: 80 }} />
            : <TagColor background={color?.background as string} color={color?.color as string} status={color?.status as InfluencerContentStatus} />}
        </>
      },
    },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   render: (_, record: InfluencerInCampaign) => {
    //     return (
    //       record.status == 'accepted_invitation' && (
    //         <div className="flex gap-2">
    //           <button
    //             className="text-blue-600 hover:bg-gray-200 rounded-md transition-all px-3 py-1"
    //             onClick={() => handleApprove(record.creator.id as string)}
    //           >
    //             Approve
    //           </button>
    //           <button
    //             className="text-red-500 px-3 py-1 rounded"
    //             onClick={() => handleReject(record.creator.id as string)}
    //           >
    //             Reject
    //           </button>
    //         </div>
    //       )
    //     );
    //   },
    // },
  ];

export const genders = ['male', 'female', 'other', 'all']

export const genderFilterOptions = ['male', 'female']

export const ageAudience = [
  {
    label: '18 - 24',
    value: [18, 24]
  },
  {
    label: '25 - 32',
    value: [25, 32]
  },
  {
    label: '33 - 40',
    value: [33, 40]
  },
  {
    label: '41 - 50',
    value: [41, 50]
  },
]
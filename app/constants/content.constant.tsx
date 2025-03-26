import {
  Avatar,
  Dropdown,
  Menu,
} from 'antd';
import TagColor from '~/components/ui/tagColor';
import { getColorStatusContent } from '~/helpers/campaign.helper';

import { EllipsisOutlined } from '@ant-design/icons';

export const ContentsColumns = [
    {
      title: "Campaign name",
      dataIndex: "campaignName",
      key: "campaignName",
    },
    {
      title: "Influencer name",
      dataIndex: "influencer",
      key: "influencer",
      render: (influencer: any) => (
        <div className="flex items-center space-x-2">
          <Avatar src={influencer.avatar} />
          <span>{influencer.name}</span>
        </div>
      ),
    },
    {
      title: "Content image",
      dataIndex: "contentImage",
      key: "contentImage",
      render: () => (
        <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
      ),
    },
    {
      title: "Content format",
      dataIndex: "contentFormat",
      key: "contentFormat",
    },
    {
      title: "Created date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Posting date",
      dataIndex: "postingDate",
      key: "postingDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusColors: any = {
          "Not Reviewed Yet": "gray",
          "Rejected": "red",
          "Not Post": "orange",
          "Posted": "green",
        };
        return <TagColor
         background={getColorStatusContent('approved')?.background as string} 
         status={getColorStatusContent('approved')?.status as string}
         color={getColorStatusContent('approved')?.color as string} />
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit">Edit</Menu.Item>
              <Menu.Item key="delete">Delete</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <EllipsisOutlined className="cursor-pointer text-lg" />
        </Dropdown>
      ),
    },
  ];
  
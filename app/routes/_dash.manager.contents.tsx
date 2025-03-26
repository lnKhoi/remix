import React from 'react';

import { Table } from 'antd';
import { ContentsColumns } from '~/constants/content.constant';

const data = [
  {
    key: "1",
    campaignName: "Campaign name 001",
    influencer: { name: "Ralph Edwards", avatar: "https://i.pravatar.cc/40?img=1" },
    contentFormat: "Reel",
    createdDate: "12/02/2025",
    postingDate: "",
    status: "Not Reviewed Yet",
  },
  {
    key: "2",
    campaignName: "Campaign name 001",
    influencer: { name: "Annette Black", avatar: "https://i.pravatar.cc/40?img=2" },
    contentFormat: "Post",
    createdDate: "12/02/2025",
    postingDate: "",
    status: "Not Reviewed Yet",
  },
  {
    key: "3",
    campaignName: "Campaign name 001",
    influencer: { name: "Jane Cooper", avatar: "https://i.pravatar.cc/40?img=3" },
    contentFormat: "Story",
    createdDate: "12/02/2025",
    postingDate: "",
    status: "Not Reviewed Yet",
  },
  {
    key: "4",
    campaignName: "Campaign name 001",
    influencer: { name: "Ralph Edwards", avatar: "https://i.pravatar.cc/40?img=4" },
    contentFormat: "Post",
    createdDate: "12/02/2025",
    postingDate: "",
    status: "Rejected",
  },
  {
    key: "5",
    campaignName: "Campaign name 001",
    influencer: { name: "Jerome Bell", avatar: "https://i.pravatar.cc/40?img=5" },
    contentFormat: "Reel",
    createdDate: "12/02/2025",
    postingDate: "12/03/2025",
    status: "Posted",
  },{
    key: "2",
    campaignName: "Campaign name 001",
    influencer: { name: "Annette Black", avatar: "https://i.pravatar.cc/40?img=2" },
    contentFormat: "Post",
    createdDate: "12/02/2025",
    postingDate: "",
    status: "Not Reviewed Yet",
  },
  {
    key: "3",
    campaignName: "Campaign name 001",
    influencer: { name: "Jane Cooper", avatar: "https://i.pravatar.cc/40?img=3" },
    contentFormat: "Story",
    createdDate: "12/02/2025",
    postingDate: "",
    status: "Not Reviewed Yet",
  },
  {
    key: "4",
    campaignName: "Campaign name 001",
    influencer: { name: "Ralph Edwards", avatar: "https://i.pravatar.cc/40?img=4" },
    contentFormat: "Post",
    createdDate: "12/02/2025",
    postingDate: "",
    status: "Rejected",
  },
];

const Contents = () => {
  return (
    <div className="p-4">
      <Table
        columns={ContentsColumns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        className="shadow-md rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default Contents;

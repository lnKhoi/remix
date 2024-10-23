import React from 'react';

import { Skeleton } from 'antd';

const ReviewCard: React.FC = () => {


  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md">
      <Skeleton loading  active avatar paragraph={{ rows: 2 }}>
      </Skeleton>
    </div>
  );
};

export default ReviewCard;

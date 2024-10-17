import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Spin,
  Table,
} from 'antd';
import { getInfluencerImported } from '~/apis/creator';
import NoCSV from '~/assets/no-csv.png';
import { creatorColumns } from '~/constants/creator.constant';
import { useAuthContext } from '~/contexts/auth.context';
import { Creator } from '~/models/User.model';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import {
  Link,
  MetaFunction,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Creators' }];
};

const Page: FC = () => {
  const { userInfo } = useAuthContext();
  const [influencers, setInfluencers] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetListInfluencerImported = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await getInfluencerImported(100, 1);
      setInfluencers(res?.data?.paginatedInfluencersData || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetListInfluencerImported();
  }, []);


  return (
    <div>
      <div className='flex w-full justify-end mb-5'>
        <Link to='/manager/creator/import-influencer'>
          <Button className='bg-gray-100 mt-3 hover:bg-gray-400 border-gray-100' type='text'>
            <div className='flex items-center gap-1'>
              <CloudArrowDownIcon width={20} className='mr-1' />
              Import CSV
            </div>
          </Button>
        </Link>
      </div>

      <Spin spinning={loading}>
        <Table<Creator>
          columns={creatorColumns}
          dataSource={influencers}
          locale={{
            emptyText: (
              <div className='flex items-center flex-col h-[70vh] justify-center'>
                <img className='w-[390px] object-contain' src={NoCSV} alt='no csv' />
                <Link to='/manager/creator/import-influencer'>
                  <Button className='bg-gray-100 mt-3 hover:bg-gray-400 border-gray-100' type='text'>
                    <div className='flex items-center gap-1'>
                      <CloudArrowDownIcon width={20} className='mr-1' />
                      Import CSV
                    </div>
                  </Button>
                </Link>
              </div>
            ),
          }}
        />
      </Spin>

    </div>
  );
};

export default Page;

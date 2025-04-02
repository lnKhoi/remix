import React, {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Spin,
  Table,
} from 'antd';
import debounce from 'lodash/debounce';
import { getInfluencerImported } from '~/apis/creator';
import NoCSV from '~/assets/no-csv.png';
import ModalViewInfluencerProfile
  from '~/components/campaign/ModalViewInfluencerProfile';
import { InputSearch } from '~/components/ui/input-search';
import { creatorColumns } from '~/constants/creator.constant';
import { useAuthContext } from '~/contexts/auth.context';
import { Creator } from '~/models/User.model';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import {
  Link,
  MetaFunction,
  useNavigate,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Creators' }];
};

const Page: FC = () => {
  const { hasPermission, userInfo } = useAuthContext()
  const [hiddenEmails, setHiddenEmails] = useState<{ [key: string]: boolean }>({});
  const [influencers, setInfluencers] = useState<{ total: number, data: Creator[] }>({ total: 0, data: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Creator | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [params, setParams] = useState<{ page: number, pageSize: number }>({ page: 1, pageSize: 10 })

  const [search, setSearch] = useState<string>('')

  const navigate = useNavigate()

  const toggleEmailVisibility = (email: string) => {
    setHiddenEmails((prev) => ({
      ...prev,
      [email]: !prev[email], // Toggle visibility correctly
    }));
  };

  const handleGetListInfluencerImported = async (): Promise<void> => {

    setLoading(true);
    await getInfluencerImported(params.pageSize, params.page,search)
      .then(res => {
        setInfluencers({ total: res?.data?.total, data: res?.data?.paginatedInfluencersData })
      })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    handleGetListInfluencerImported();
  }, [params,search]);

  // Handle row click to open the drawer
  const handleRowClick = (record: any) => {
    if (record.hasAccount === 1) {
      setSelectedInfluencer(record);
      setIsDrawerVisible(true);
    }
  };

  useEffect(() => {
    userInfo && !hasPermission('view-imported-influencer') && navigate('/page-not-found')
  }, [userInfo])

  if (!userInfo) return <></>


  const handleSearchCampaigns = debounce(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSearch(e.target.value);
    }, 500);

  return (
    <div>
        <div className='flex flex-col'>
          <h2 className='text-2xl text-gray-900'>Creators</h2>
        </div>
      <div className='flex mt-4 w-full justify-between items-center mb-5'>
        <InputSearch
          onChange={(e) => handleSearchCampaigns(e)}
          placeholder='Creator name or email'
          className='w-[300px] h-[36px] '
        />
        <Link to='/manager/creator/import-influencer'>
          {hasPermission('import-influencer-csv') && (
            <Button className='bg-gray-100 mt-3 hover:bg-gray-400 border-gray-100' type='text'>
              <div className='flex items-center gap-1'>
                <CloudArrowDownIcon width={20} className='mr-1' />
                Import CSV
              </div>
            </Button>
          )}
        </Link>
      </div>

      <Spin spinning={loading}>
        <Table<Creator>
          columns={creatorColumns(toggleEmailVisibility, hiddenEmails)}
          pagination={{
            total: influencers.total,
            onChange: (page, pageSize) => {
              setParams({ page: page, pageSize: pageSize })
            },
          }}
          dataSource={influencers.data}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          bordered
          className='cursor-pointer'
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

      {isDrawerVisible && (
        <ModalViewInfluencerProfile
          id={selectedInfluencer?.creatorId}
          open={isDrawerVisible}
          onClose={() => setIsDrawerVisible(false)} />
      )}
    </div>
  );
};

export default Page;

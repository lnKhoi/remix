import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Popover,
  Table,
} from 'antd';
import debounce from 'lodash/debounce';
import { getContents } from '~/apis/content';
import ModalFilterContent, {
  FormData,
} from '~/components/content/ModalFilterContent';
import { InputSearch } from '~/components/ui/input-search';
import { ContentsColumns } from '~/constants/content.constant';
import { Content } from '~/models/Content.model';

import { FunnelIcon } from '@heroicons/react/24/outline';

const Contents = () => {
  const [params, setParams] = useState<{ page: number, perPage: number }>({ page: 1, perPage: 10 })
  const [contents, setContents] = useState<{ total: number, data: Content[] }>({ total: 0, data: [] })
  const [loading, setLoading] = useState<boolean>(false)
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const handleGetContents = (showLoading: boolean, filter: FormData | null) => {
    showLoading ? setLoading(true) : setLoading(false)
    getContents(params.page, params.perPage, search, filter).then((res) => {
      setContents({ total: res?.data?.total, data: res?.data?.data })
    })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    handleGetContents(true, null)
  }, [params, search])

  const handleSearchCampaigns = debounce(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSearch(e.target.value);
    }, 500);

  const handleFilter = useCallback((filter: FormData | null) => {
    setIsFilter(false)
    handleGetContents(true, filter)
  }, [])

  // Add this new handler for closing the popover
  const handleVisibleChange = (visible: boolean) => {
    setIsFilter(visible);
  };

  return (
    <div>
      <div className='flex flex-col'>
        <h2 className='text-2xl text-gray-900'>Content</h2>
      </div>
      <div className='flex items-center gap-3 mt-[21px]'>
        <InputSearch onChange={(e) => handleSearchCampaigns(e)} className='w-[300px] h-[36px]' placeholder='Influencer name or campaign name' />
        <Popover
          open={isFilter}
          trigger={['click']}
          placement={'rightBottom'}
          content={<ModalFilterContent onFilter={handleFilter} />}
          onOpenChange={handleVisibleChange} // Add this prop
        >
          <Button
            onClick={() => setIsFilter(!isFilter)}
            className='bg-gray-100 font-semibold border-gray-100'
            icon={<FunnelIcon className='w-5 h-5' />}
          >
            Filter
          </Button>
        </Popover>
      </div>
      <Table
        columns={ContentsColumns({
          loading: loading,
          onRefresh: () => handleGetContents(false, null)
        })}
        onChange={(e) => setParams({ ...params, page: e.current as number })}
        dataSource={loading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as any : contents.data}
        pagination={{
          total: contents.total,
          pageSize: 10,
          showSizeChanger: false,
          defaultCurrent: 1,
        }}
        scroll={{ x: "max-content" }}
        className="shadow-md rounded-lg mt-4 overflow-hidden"
      />
    </div>
  );
};

export default Contents;
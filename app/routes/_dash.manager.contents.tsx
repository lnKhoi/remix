import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Button,
  Popover,
  Table,
} from 'antd';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import { getContents } from '~/apis/content';
import ModalFilterContent from '~/components/content/ModalFilterContent';
import { InputSearch } from '~/components/ui/input-search';
import {
  ContentsColumns,
  initialFilterContent,
} from '~/constants/content.constant';
import { countActiveFilters } from '~/helpers/content.helper';
import {
  Content,
  FilterContentPayload,
} from '~/models/Content.model';

import { FunnelIcon } from '@heroicons/react/24/outline';

const paramsDefault = { page: 1, perPage: 10 };

const Contents = () => {
  const [params, setParams] = useState<{ page: number; perPage: number }>(paramsDefault);
  const [contents, setContents] = useState<{ total: number; data: Content[] }>({ total: 0, data: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<FilterContentPayload>(initialFilterContent);

  const countFilter = useMemo(() => countActiveFilters(filter), [filter]);

  const handleGetContents = (showLoading: boolean) => {
    if (showLoading) setLoading(true);

    getContents(params.page, params.perPage, search, countFilter > 0 ? filter : undefined)
      .then((res) => {
        setContents({ total: res?.data?.total, data: res?.data?.data });
      })
      .finally(() => setLoading(false));
  };

  // Reset page to 1 on search change
  useEffect(() => {
    if(params.page == 1 && params.perPage == 10) {
      handleGetContents(true)
    }else {
      setParams(paramsDefault);
    }
  }, [search]);

  // Fetch contents when page or pageSize changes
  useEffect(() => {
    handleGetContents(true);
  }, [params]);

  // Fetch contents when filter changes
  useEffect(() => {
    handleGetContents(true);
  }, [filter]);

  const handleSearchCampaigns = debounce((e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  }, 500);

  const handleFilter = useCallback((data: FilterContentPayload | null) => {
    setIsFilter(false);

    if (!data) {
      setFilter(initialFilterContent);
      return;
    }

    const updatedFormData: FilterContentPayload = {
      ...data,
      from: data.from ? dayjs(data.from) : '',
      to: data.to ? dayjs(data.to) : '',
    };

    setFilter(updatedFormData);
  }, []);

  const handleVisibleChange = (visible: boolean) => {
    setIsFilter(visible);
  };

  return (
    <div>
      <div className="flex flex-col">
        <h2 className="text-2xl text-gray-900">Content</h2>
      </div>

      <div className="flex items-center gap-3 mt-[21px]">
        <InputSearch
          onChange={handleSearchCampaigns}
          className="w-[300px] h-[36px]"
          placeholder="Influencer name or campaign name"
        />
        <Popover
          open={isFilter}
          trigger={['click']}
          placement="rightBottom"
          content={
            <ModalFilterContent
              filter={filter}
              onFilter={handleFilter}
            />
          }
          onOpenChange={handleVisibleChange}
        >
          <Button
            onClick={() => setIsFilter(!isFilter)}
            className="bg-gray-100 font-semibold border-gray-100"
            icon={<FunnelIcon className="w-5 h-5" />}
          >
            Filter
            {countFilter > 0 && (
              <span className="ml-1 bg-blue-500 text-white rounded-full text-xs px-2 py-0.5">
                {countFilter}
              </span>
            )}
          </Button>
        </Popover>
      </div>

      <Table
        columns={ContentsColumns({
          loading,
          onRefresh: () => handleGetContents(false),
        })}
        onChange={(e) => setParams({ ...params, page: e.current as number })}
        dataSource={loading ? Array.from({ length: 10 }, (_, i) => i + 1) as any : contents.data}
        pagination={{
          total: contents.total,
          pageSize: params.perPage,
          current: params.page,
          showSizeChanger: false,
        }}
        scroll={{ x: 'max-content' }}
        className="shadow-md rounded-lg mt-4 overflow-hidden"
      />
    </div>
  );
};

export default Contents;

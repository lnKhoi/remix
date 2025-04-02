import React, {
  useEffect,
  useState,
} from 'react';

import { Table } from 'antd';
import { getContents } from '~/apis/content';
import { ContentsColumns } from '~/constants/content.constant';
import { Content } from '~/models/Content.model';

const Contents = () => {
  const [params, setParams] = useState<{ page: number, perPage: number }>({ page: 1, perPage: 10 })
  const [contents, setContents] = useState<{ total: number, data: Content[] }>({ total: 0, data: [] })
  const [loading, setLoading] = useState<boolean>(false)

  const handleGetContents = (showLoading: boolean) => {
    showLoading ? setLoading(true) : setLoading(false)
    getContents(params.page, params.perPage).then((res) => {
      setContents({ total: res?.data?.total, data: res?.data?.data })
    })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    handleGetContents(true)
  }, [params])

  return (
    <div className="p-4">
      <Table
        columns={ContentsColumns({
          loading: loading,
          onRefresh: () => handleGetContents(false)
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
        className="shadow-md rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default Contents;

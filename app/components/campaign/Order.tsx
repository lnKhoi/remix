import React from 'react';

import { Table } from 'antd';
import { orderColumns } from '~/constants/campaign.constant';

function Order() {

    const influencers = [
        {
            key: "1",
        },
        {
            key: "2",
        },
        {
            key: "3",
        },
        {
            key: "3",
        },
        {
            key: "3",
        },
        {
            key: "3",
        },

    ];
    return (
        <div>
            <Table
                columns={orderColumns}
                dataSource={influencers}
            />
        </div>
    )
}

export default Order

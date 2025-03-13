import React from 'react';

import { Tabs } from 'antd';
import { integrationTabs } from '~/constants/myProfile.constant';

function Integration() {

    const onChange = (key: string) => {
    };

    return (
        <div className='-mt-2'>
            <Tabs defaultActiveKey="shopify" items={integrationTabs} onChange={onChange} />
        </div>
    )
}

export default Integration

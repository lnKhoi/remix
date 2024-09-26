import React, { useState } from 'react';

import {
  Avatar,
  Button,
  Checkbox,
} from 'antd';

import { CheckIcon } from '@heroicons/react/24/outline';

function InviteCard() {
    const [invited, setInvited] = useState<boolean>(false)

    return (
        <div className='p-3 rounded-md flex items-center justify-between border border-[#ESE7EB]'>
            <div>
                <div className='flex items-start gap-4'>
                    <Checkbox></Checkbox>
                    <div className='flex items-start gap-4'>
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                        <div>
                            <h5 className='text-[#1F2937] text-sm'>Ralph Edwards</h5>
                            <span className='text-[#6B7280] text-sm'>khoiliam.dev@gmail.com</span>
                            <div className='flex items-start gap-2 mt-2'>
                                <Button type='text' className='bg-[#E5E7EB]'>Age: 20</Button>
                                <Button type='text' className='bg-[#E5E7EB]'>Female</Button>
                                <Button type='text' className='bg-[#E5E7EB]'>Vietnam</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                {invited
                    ? <div className='flex h-[36px] justify-center rounded-md w-[99px] items-center gap-1 bg-[#F3F4F6]'><CheckIcon width={20} />Invited</div>
                    : <Button onClick={() => setInvited(true)} type='primary'>Invite</Button>
                }
            </div>

        </div>
    )
}

export default InviteCard

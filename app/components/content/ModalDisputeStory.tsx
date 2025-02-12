import React, { useState } from 'react';

import { Modal } from 'antd';
import Editor from '~/plugins/editor';

type ModalDisputeStoryProps = {
    open: boolean
    onclose: () => void
    onSuccess: () => void
}

function ModalDisputeStory({ onSuccess, onclose, open }: ModalDisputeStoryProps) {
    const [reason, setReason] = useState<string>('')
    const [loading,setLoading] = useState<boolean>(false)

    const handleDispute = () => {
        setLoading(true)
    }

    return (
        <Modal
            width={650}
            open={open}
            onOk={handleDispute}
            okText='Send'
            confirmLoading={loading}
            title='Dispute'
            onCancel={onclose}
        >
            <p className='text-sm mb-8 text-center font-normal mt-5 text-gray-800'>
                Please let us know your reason for dispute the post
            </p>
            <div className='mb-8'>
            <Editor
                value={reason}
                onChange={(v) => setReason(v)}
            />
            </div>
        </Modal>
    )
}

export default ModalDisputeStory

import React, { useState } from 'react';

import {
  DatePicker,
  Modal,
  TimePicker,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_TIME_FORMAT } from '~/constants/time.constant';

type ModalPostingDateProps = {
    loading: boolean;
    open: boolean;
    onclose: () => void;
    onApproveContent: (time: Dayjs) => void;
};

function ModalPostingDate({ loading, open, onApproveContent, onclose }: ModalPostingDateProps) {
    const minDateTime = dayjs().add(1, 'hour');
    const [submitTime, setSubmitTime] = useState<Dayjs>(minDateTime);

    return (
        <Modal
            width={355}
            confirmLoading={loading}
            onOk={() => submitTime && onApproveContent(submitTime)}
            open={open}
            okButtonProps={{ disabled: !submitTime }}
            onCancel={onclose}
            title=""
        >
            <div className="flex items-center flex-col justify-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Posting Date</h2>
                <p className="text-sm text-center text-gray-800 mt-1">
                    The date content goes live on influencer's social media platforms.
                </p>
            </div>
            <div className="flex flex-col gap-2 pb-3">
                <span className="text-sm font-semibold text-gray-800 text-left">Posting Date</span>
                <DatePicker
                    onChange={(date) =>
                        setSubmitTime((prev) => {
                            const time = prev || minDateTime;
                            return dayjs(date).set('hour', time.hour()).set('minute', time.minute());
                        })
                    }
                    disabledDate={(current) => current && current < minDateTime.startOf('day')}
                    style={{ width: '100%' }}
                    format={DATE_TIME_FORMAT}
                    value={submitTime}
                />
                <span className="text-sm font-semibold text-gray-800 mt-3 text-left">Time</span>
                <TimePicker
                    onChange={(time) =>
                        setSubmitTime((prev) => {
                            const date = prev || minDateTime;
                            return dayjs(date).set('hour', time.hour()).set('minute', time.minute());
                        })
                    }
                    disabledHours={() => {
                        const selectedDate = submitTime || minDateTime;
                        if (selectedDate.isSame(minDateTime, 'day')) {
                            return [...Array(24).keys()].filter((hour) => hour < minDateTime.hour());
                        }
                        return [];
                    }}
                    disabledMinutes={(selectedHour) => {
                        const selectedDate = submitTime || minDateTime;
                        if (
                            selectedDate.isSame(minDateTime, 'day') &&
                            selectedHour === minDateTime.hour()
                        ) {
                            return [...Array(60).keys()].filter((minute) => minute < minDateTime.minute());
                        }
                        return [];
                    }}
                    style={{ width: '100%' }}
                    format="HH:mm"
                    value={submitTime}
                />
            </div>
        </Modal>
    );
}

export default ModalPostingDate;

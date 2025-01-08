import { Dayjs } from "dayjs"

export const DATE_TIME_FORMAT_V2 = 'DD/MM/YYYY HH:mm'
export const DATE_TIME_FORMAT = 'DD/MM/YYYY'
export const DATE_TIME_FORMAT_V3 = 'YYYY-MM-DD'
export const DATE_TIME_FORMAT_V4 = 'DD MMM, YYYY'

export const FILTER_OPTION = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'ytd', label: 'This Year' },
    { value: 'custom', label: 'Custom Date' },
]

export const FINANCE_FILTER_OPTIONS = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'ytd', label: 'This Year' },
    { value: 'custom', label: 'Custom Date' },
]

export const generateTimeOptions = (selectedDate: Dayjs) => {
    const now = new Date();
    const currentHour = now.getHours();
    const isToday = selectedDate.isSame(now, 'day');
    const currentMinute = now.getMinutes();

    const options = [];
    const startHour = currentHour + 1;

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

            const isPast =
                isToday ? hour < startHour || (hour === startHour && minute < currentMinute) : false

            options.push({ value: label, label, disabled: isPast });
        }
    }

    return options;
};

export const getCurrentTime = () => {
    const now = new Date();
    let hour = now.getHours() + 1;
    let minute = now.getMinutes();

    if (hour >= 24) hour = hour % 24;

    if (minute > 0 && minute <= 30) {
        minute = 30;
    } else if (minute > 30) {
        minute = 0;
        hour += 1;
    }
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};
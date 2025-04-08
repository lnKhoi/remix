import dayjs, { Dayjs } from 'dayjs';
import { initialFilterContent } from '~/constants/content.constant';
import { DATE_TIME_FORMAT } from '~/constants/time.constant';
import { FilterContentPayload } from '~/models/Content.model';

// Output: [00:00, 00:30, 1:00, 1:30]
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

// Input: 1:01
// Output: 2:30
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

const normalizeDate = (date: string | Dayjs | null): string =>
    date && dayjs.isDayjs(date) ? date.format(DATE_TIME_FORMAT) : (date || '');

const isArrayDifferent = (a: any[], b: any[]): boolean =>
    a.length !== b.length || a.some((val, idx) => val !== b[idx]);

const isRangeDifferent = (a: number[], b: number[]): boolean =>
    a[0] !== b[0] || a[1] !== b[1];

export const countActiveFilters = (current: FilterContentPayload): number => {
    let count = 0;

    if (normalizeDate(current.from) !== initialFilterContent.from) count++;
    if (normalizeDate(current.to) !== initialFilterContent.to) count++;

    if (isArrayDifferent(current.campaignIds, initialFilterContent.campaignIds)) count++;
    if (isArrayDifferent(current.influencerIds, initialFilterContent.influencerIds)) count++;

    if (isRangeDifferent(current.engagementRate, initialFilterContent.engagementRate)) count++;
    if (isArrayDifferent(current.conversionRate, initialFilterContent.conversionRate)) count++;
    if (isRangeDifferent(current.costPerClick, initialFilterContent.costPerClick)) count++;
    if (isRangeDifferent(current.revenue, initialFilterContent.revenue)) count++;
    if (isRangeDifferent(current.clicks, initialFilterContent.clicks)) count++;
    if (isRangeDifferent(current.purchases, initialFilterContent.purchases)) count++;

    return count;
};

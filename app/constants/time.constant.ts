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

export const generateTimeOptions = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const options = [];
    for (let hour = 1; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const isPast = hour < currentHour || (hour === currentHour && minute < currentMinute);
            options.push({ value: label, label, disabled: isPast });
        }
    }

    return options;
};

export const getCurrentTime = () => {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    if (minute <= 30) {
        minute < 1 ? minute = 0 : minute = 30
    } else {
        minute = 0;
        hour += 1;
    }

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};
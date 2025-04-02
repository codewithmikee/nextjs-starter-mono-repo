export type DateTimeFormat = 'date' | 'datetime' | 'time' | 'simple_date_time';

const formatDateToShow = (
  dateInput: string | Date,
  type: DateTimeFormat = 'datetime',
  use24HourFormat: boolean = false // Default to 12-hour, set to true for 24-hour
) => {
  const date = new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Africa/Addis_Ababa' // Ethiopian timezone (UTC+3)
  };

  if (type === 'date') {
    return new Intl.DateTimeFormat('en-US', {
      ...options,
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).format(date);
  }

  if (type === 'time') {
    return new Intl.DateTimeFormat('en-US', {
      ...options,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !use24HourFormat // False for 24-hour format, True for 12-hour
    }).format(date);
  }

  if (type === 'simple_date_time') {
    return new Intl.DateTimeFormat('en-US', {
      ...options,
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: !use24HourFormat // False for 24-hour format, True for 12-hour
    }).format(date);
  }

  return new Intl.DateTimeFormat('en-US', {
    ...options,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24HourFormat // False for 24-hour format, True for 12-hour
  }).format(date);
};

export const DateFormatter = {
  toShow: formatDateToShow
};
